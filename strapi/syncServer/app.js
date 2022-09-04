var fs = require('fs');

const { request } = require('@octokit/request');
const { createAppAuth } = require('@octokit/auth-app');
const auth = createAppAuth({
  appId: process.env.GH_APP_ID,
  privateKey: process.env.GH_APP_SECRET_KEY.replaceAll('\\n', '\n'),
  installationId: process.env.GH_APP_INSTALLATION_ID,
});

const express = require('express');
const app = express();

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const PM2_CMD =
  'pm2 startOrRestart ecosystem.config.js && until [ "$(curl -X HEAD -o /dev/null -s -w "%{http_code}\n" http://localhost:1338/_health)" = 204 ]; do sleep 1; done';

const { S3 } = require('@aws-sdk/client-s3');
const { TransferMonitor } = require('s3-sync-client');
const S3SyncClient = require('s3-sync-client');
const s3Client = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});
const { sync } = new S3SyncClient({ client: s3Client });
const monitor = new TransferMonitor();
monitor.on('progress', (progress) => console.log(progress));
setTimeout(() => monitor.abort(), 30000); // optional abort

// ignore file that filters from .gitignore
const ignore = require('ignore');
const ig = ignore().add(
  fs
    .readFileSync('/opt/app/.gitignore', 'utf8')
    .toString()
    .split('\n')
    .filter((line) => line.length > 0 && line[0] !== '#'),
);

app.get('/manager-control/:id', async (req, res) => {
  if (undefined === req.params.id) {
    res.status(400).json({ text: 'fail' });
  }
  await sync(
    `s3://${process.env.STRAPI_S3_BUCKET}/${req.params.id}`,
    '/opt/app',
    {
      monitor,
      del: true,
      relocations: [[`${req.params.id}`, '']],
      filters: [
        {
          exclude: (key) => {
            const flag = ig.ignores(key);
            if (flag) console.log(key);
            return flag;
          },
        },
        {
          exclude: (key) => {
            const flag = key == '/syncServer/app.js';
            if (flag) console.log(key);
            return flag;
          },
        },
      ],
    },
  );
  res.send('success');

  const { stdout, stderr } = await exec(
    `cd /opt/app && npm install && cd src && find . -type d -empty -delete && cd /opt/app &&${PM2_CMD}`,
  );

  var status = 'succeeded';

  if (stderr) {
    console.error(`exec error: ${error}`);
    status = 'failed';
  }
  console.log(`stdout: ${stdout}`);

  const requestWithAuth = request.defaults({
    request: {
      hook: auth.hook,
    },
    mediaType: {
      previews: ['machine-man'],
    },
  });
  const { data: app } = await requestWithAuth('GET /app');
  const response = await requestWithAuth(
    'POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches',
    {
      owner: process.env.REPO.split('/')[0],
      repo: process.env.REPO.split('/')[1],
      workflow_id: process.env.GH_STRAPI_WORKFLOW_ID,
      ref: process.env.BRANCH,
      inputs: {
        tag: `${req.params.id}`,
        environment: process.env.ENV,
        status,
      },
    },
  );
});

app.get('/health', async (req, res) => {
  res.send('success');
});

app.listen(1339, () => {
  console.log(`Control Server Running on Port 1339...`);
});

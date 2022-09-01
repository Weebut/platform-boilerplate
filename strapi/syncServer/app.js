var fs = require('fs');
const express = require('express');
const app = express();

const exec = require('child_process').exec;
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
  exec(`cd /opt/app && ${PM2_CMD}`, (error, stdout, stderr) => {
    if (error || stderr) {
      console.error(`exec error: ${error}`);
      res.status(400).json({ text: 'fail' });
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
  res.send('success');
});

app.get('/health', async (req, res) => {
  res.send('success');
});

app.listen(1339, () => {
  console.log(`Control Server Running on Port 1339...`);
});

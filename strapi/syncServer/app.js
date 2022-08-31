var fs = require('fs');
const express = require('express');
const app = express();

const exec = require('child_process').exec;
const PM2_CMD =
  'cd /opt/app/syncServer && pm2 startOrRestart ecosystem.config.js';

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

app.get('/:id', async (req, res) => {
  await sync(
    `s3://${process.env.STRAPI_S3_BUCKET}/${req.params.id}`,
    '/opt/app',
    {
      monitor,
      del: true,
      relocations: [[`${req.params.id}`, '']],
      filters: [{ exclude: (key) => ig.ignores(key) }],
    },
  );
  exec(`cd /opt/app && ${PM2_CMD}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.send('fail');
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
  res.send('success');
});

app.listen(1339, () => {
  console.log(`Control Server Running on Port 1339...`);
});

'use strict';
var fs = require('fs');

<<<<<<< HEAD
const { request } = require('@octokit/request');
const { createAppAuth } = require('@octokit/auth-app');
const auth = createAppAuth({
  appId: process.env.GH_APP_ID,
  privateKey: process.env.GH_APP_SECRET_KEY.replaceAll('\\n', '\n'),
  installationId: process.env.GH_APP_INSTALLATION_ID,
});
=======
const { Octokit } = require('@octokit/core');
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
>>>>>>> 54ebda8a7d2ee9bd03ecc5ebcde16994e2612d7e

// s3 client and sync initialization
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

module.exports = ({ strapi }) => ({
  async getAllDeployments(query) {
    const q = await strapi.entityService.findMany(
      'plugin::deploybot.deployment',
      query,
    );
    return q;
  },

  async createDeployment() {
    const q = await strapi.entityService.findMany(
      'plugin::deploybot.deployment',
      {
        fields: ['status'],
        filters: { status: 'pending' },
        sort: { timestamp: 'DESC' },
      },
    );
    if (q.length > 0) {
      throw Error('진행중인 배포가 있습니다.');
    }
    const deployment = await strapi.entityService.create(
      'plugin::deploybot.deployment',
      {
        data: {
          timestmap: new Date().getTime(),
          name: new Date().toLocaleString(),
          status: 'pending',
        },
      },
    );
    await sync(
      '/opt/app',
      `s3://${process.env.STRAPI_S3_BUCKET}/${deployment.id}`,
      {
        filters: [{ exclude: (key) => ig.ignores(key) }],
        monitor,
      },
    );
<<<<<<< HEAD
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
=======
    const response = await octokit.request(
>>>>>>> 54ebda8a7d2ee9bd03ecc5ebcde16994e2612d7e
      'POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches',
      {
        owner: process.env.REPO.split('/')[0],
        repo: process.env.REPO.split('/')[1],
<<<<<<< HEAD
        workflow_id: process.env.GH_STRAPI_WORKFLOW_ID,
        ref: process.env.BRANCH,
        inputs: {
          tag: deployment.id.toString(),
=======
        workflow_id: 'strapi_console',
        client_payload: {
          tag: deployment.id,
>>>>>>> 54ebda8a7d2ee9bd03ecc5ebcde16994e2612d7e
          environment: process.env.ENV,
        },
      },
    );

    if (response.status !== 204) {
      await strapi.entityService.update(
        'plugin::deploybot.deployment',
        newDeployment.id,
        {
          data: {
            status: 'failed',
          },
        },
      );
    }

    return deployment;
  },

  async markDeployment(id, status) {
    if (status == 'pending') {
      const q = await strapi.entityService.findMany(
        'plugin::deploybot.deployment',
        {
          fields: ['id'],
          filters: { status: 'pending' },
          sort: { timestamp: 'DESC' },
        },
      );
      if (q.length > 0) {
        throw Error('진행중인 배포가 있습니다.');
      }
    }
    return await strapi.entityService.update(
      'plugin::deploybot.deployment',
      id,
      {
        data: {
          status,
        },
      },
    );
  },

  async reDeployment(id) {
    const q = await strapi.entityService.findMany(
      'plugin::deploybot.deployment',
      {
        fields: ['id'],
        filters: { status: 'pending' },
        sort: { timestamp: 'DESC' },
      },
    );
    if (q.length > 0) {
      throw Error('진행중인 배포가 있습니다.');
    }
    const deployment = await strapi.entityService.findOne(
      'plugin::deploybot.deployment',
      id,
      {
        fields: ['status', 'parent'],
      },
    );
    if (deployment.status !== 'succeeded') {
      throw Error('이 배포는 사용할 수 없습니다.');
    }

    const newDeployment = await strapi.entityService.create(
      'plugin::deploybot.deployment',
      {
        data: {
          timestmap: new Date().getTime(),
          name: new Date().toLocaleString(),
          parent: deployment.parent || id,
          status: 'pending',
        },
      },
    );
    const syncOps = await sync(
      '/opt/app',
      `s3://${process.env.STRAPI_S3_BUCKET}/${deployment.id}`,
      {
        filters: [{ exclude: (key) => ig.ignores(key) }],
        dryRun: true,
        monitor,
      },
    );

<<<<<<< HEAD
    const { data: app } = await requestWithAuth('GET /app');
    const response = await requestWithAuth(
=======
    const response = await octokit.request(
>>>>>>> 54ebda8a7d2ee9bd03ecc5ebcde16994e2612d7e
      'POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches',
      {
        owner: process.env.REPO.split('/')[0],
        repo: process.env.REPO.split('/')[1],
<<<<<<< HEAD
        workflow_id: process.env.GH_STRAPI_WORKFLOW_ID,
        ref: process.env.BRANCH,
        inputs: {
          tag: deployment.id.toString(),
=======
        workflow_id: 'strapi_console',
        client_payload: {
          tag: deployment.id,
>>>>>>> 54ebda8a7d2ee9bd03ecc5ebcde16994e2612d7e
          environment: process.env.ENV,
        },
      },
    );

    if (response.status !== 204) {
      await strapi.entityService.update(
        'plugin::deploybot.deployment',
        newDeployment.id,
        {
          data: {
            status: 'failed',
          },
        },
      );
    }

    console.log(syncOps);
    return deployment;
  },
});

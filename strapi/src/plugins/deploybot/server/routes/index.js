module.exports = [
  {
    method: 'GET',
    path: '/getall',
    handler: 'deployController.getAllDeployments',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/create',
    handler: 'deployController.createDeployment',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'PUT',
    path: '/:id/status/:status',
    handler: 'deployController.markDeployment',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'PUT',
    path: '/redeploy/:id',
    handler: 'deployController.reDeployment',
    config: {
      policies: [],
      auth: false,
    },
  },
];

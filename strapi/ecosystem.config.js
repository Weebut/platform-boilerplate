module.exports = {
  apps: [
    {
      name: 'init-cms', // Your project name
      cwd: '/opt/app', // Path to your project
      script: 'npm', // For this example we're using npm, could also be yarn
      args: 'run pm2start', // Script to start the Strapi server, `start` by default
      env: {
        NODE_ENV: 'production',
        PORT: 1338,
      },
    },
  ],
};

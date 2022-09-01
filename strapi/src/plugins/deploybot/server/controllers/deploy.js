'use strict';

module.exports = {
  async getAllDeployments(ctx) {
    try {
      return await strapi
        .plugin('deploybot')
        .service('deployService')
        .getAllDeployments(ctx.query);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async createDeployment(ctx) {
    try {
      ctx.body = await strapi
        .plugin('deploybot')
        .service('deployService')
        .createDeployment();
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async reDeployment(ctx) {
    try {
      ctx.body = await strapi
        .plugin('deploybot')
        .service('deployService')
        .reDeployment(ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async markDeployment(ctx) {
    try {
      ctx.body = await strapi
        .plugin('deploybot')
        .service('deployService')
        .markDeployment(ctx.params.id, ctx.params.status);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};

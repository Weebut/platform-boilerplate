'use strict';

/**
 * hello-world service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::hello-world.hello-world');

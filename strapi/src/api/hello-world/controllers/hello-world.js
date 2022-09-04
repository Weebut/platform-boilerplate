'use strict';

/**
 * hello-world controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::hello-world.hello-world');

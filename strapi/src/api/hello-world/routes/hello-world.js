'use strict';

/**
 * hello-world router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::hello-world.hello-world');

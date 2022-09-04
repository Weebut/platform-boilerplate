'use strict';

/**
 * hellow-world router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::hellow-world.hellow-world');

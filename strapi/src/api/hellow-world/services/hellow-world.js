'use strict';

/**
 * hellow-world service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::hellow-world.hellow-world');

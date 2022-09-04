'use strict';

/**
 * hellow-world controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::hellow-world.hellow-world');

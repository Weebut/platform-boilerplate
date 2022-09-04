'use strict';

/**
 * hellyeah service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::hellyeah.hellyeah');

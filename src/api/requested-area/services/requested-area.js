'use strict';

/**
 * requested-area service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::requested-area.requested-area');

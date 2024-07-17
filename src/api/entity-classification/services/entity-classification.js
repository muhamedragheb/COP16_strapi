'use strict';

/**
 * entity-classification service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::entity-classification.entity-classification');

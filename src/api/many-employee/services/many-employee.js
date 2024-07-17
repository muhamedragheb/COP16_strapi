'use strict';

/**
 * many-employee service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::many-employee.many-employee');

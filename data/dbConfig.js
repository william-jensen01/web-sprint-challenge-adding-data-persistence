// Complete your db configuration using the `environment` variable.
const knex = require('knex');
const config = require('../knexfile');

const environment = process.env.NODE_ENV || "development";

const configuredKnex = knex(config[environment]);

module.exports = configuredKnex;
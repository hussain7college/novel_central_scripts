import knex from 'knex';
import config from '../knexfile.js';

const dbClient = knex(config.development);
export default dbClient;
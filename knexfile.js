// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {

  development: {
    client: 'better-sqlite3',
    connection: {
      filename: './db.sqlite3'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'better-sqlite3',
    connection: {
      database: 'novel_central_db',
      user: 'username',
      password: 'password'
    },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'better-sqlite3',
    connection: {
      database: 'novel_central_db',
      user: 'username',
      password: 'password'
    },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function (knex) {

  return Promise.resolve(
    // Create novels table
    knex.schema.createTable('novels', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('urls');
      table.string('summary');
      table.string('genre');
      table.string('created_at');
      table.string('updated_at');
    }),
    // Create chapters table
    knex.schema.createTable('chapters', (table) => {
      table.increments('id').primary();
      table.integer('novel_id').unsigned().references('id').inTable('novels');
      table.string('url');
      table.text('content');
      table.string('created_at');
      table.string('updated_at');
    })
  );


};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = function (knex) {
  return Promise.resolve(
    // Drop chapters table
    knex.schema.dropTable('chapters'),
    // Drop novels table
    knex.schema.dropTable('novels')
  );

};

export { up, down };
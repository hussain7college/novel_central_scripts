/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function (knex) {

  return Promise.resolve(knex.schema
    .createTable('novels', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('url');
      table.string('summary');
      table.string('genre');
      table.string('created_at');
      table.string('updated_at');
    })
    .createTable('chapters', (table) => {
      table.increments('id').primary();
      table.integer('novel_id').unsigned().references('id').inTable('novels');
      table.string('number');
      table.string('name');
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
    knex.schema
      .dropTable('chapters')
      .dropTable('novels')
  );

};

export { up, down };
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('words', function (table) {
        table.increments('id').primary();
        table
            .integer('user_id')
            .unsigned()
            .references('users.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');            
        table.string('word').notNullable();
        table.string('translation').notNullable();
        table.integer('progress').defaultTo(0);
        table.string('notes');
        table.date('date');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('words');
};

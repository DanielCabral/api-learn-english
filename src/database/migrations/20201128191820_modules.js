
exports.up = function(knex) {
    return knex.schema.createTable('modules',function(table){
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('level').notNullable();
        table.string('image').notNullable();
        table.integer('user_id');
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('modules');
};

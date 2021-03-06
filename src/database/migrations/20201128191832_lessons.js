
exports.up = function(knex) {
    return knex.schema.createTable('lessons',function(table){
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('link').notNullable();
        table.string('thumbnail').notNullable();
        table.integer('id_module').notNullable();
        table.integer('id_user').notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at");              
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('lessons');
};

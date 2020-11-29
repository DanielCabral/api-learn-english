
exports.up = function(knex) {
    return knex.schema.createTable('favorites',function(table){
        table.increments('id').primary();              
        table.integer('id_user').notNullable();
        table.integer('id_aula').unsigned().notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('favorites');
};


exports.up = function(knex) {
    return knex.schema.createTable('coments',function(table){
        table.increments('id').primary();
        table.string('comment').notNullable();        
        table.integer('id_user').notNullable();
        table.integer('id_aula').notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('comments');
};

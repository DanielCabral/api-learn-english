
exports.up = function(knex) {
    return knex.schema.createTable('coments',function(table){
        table.increments('id').primary;
        table.string('comment').notNullable();        
        table.integer('id_user').notNullable().references('id').inTable('users');
        table.integer('id_aula').notNullable().references('id').inTable('lessons');
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('comments');
};

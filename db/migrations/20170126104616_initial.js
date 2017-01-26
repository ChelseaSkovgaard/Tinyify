
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('folders', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.timestamps();
    }),
    knex.schema.createTable('urls', function(table){
      table.increments('id').primary();
      // table.string('id').primary();
      table.string('actualurl');
      table.string('shorturl');
      table.integer('clickCount');
      table.integer('folder_id')
        .references('id')
        .inTable('folders');

      table.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
         knex.schema.dropTable('folders'),
         knex.schema.dropTable('urls')
     ])
};

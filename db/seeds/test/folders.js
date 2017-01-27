exports.seed = function(knex, Promise) {
  return knex('folders').del()
  .then(() => {
    return Promise.all([
      knex('folders').insert({
        id: 1,
        name: 'Folder One',
        created_at: new Date
      }),
      knex('folders').insert({
        id: 2,
        name: 'Folder Two',
        created_at: new Date
      })
    ]);
  });
};

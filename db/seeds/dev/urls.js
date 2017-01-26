exports.seed = function(knex, Promise) {
  return knex('urls').del()
  .then(() => {
    return Promise.all([
      knex('urls').insert({
        id: 98,
        actualurl: "https://www.google.com",
        shorturl: 1,
        clickCount: 0,
        folder_id: 1,
        created_at: new Date
      }),
      knex('urls').insert({
        id: 1,
        actualurl: "https://www.amazon.com",
        shorturl: 2,
        clickCount: 0,
        folder_id: 1,
        created_at: new Date
      }),
      knex('urls').insert({
        id: 2,
        actualurl: "https://www.espn.com",
        shorturl: 3,
        clickCount: 0,
        folder_id: 2,
        created_at: new Date
      })
    ]);
  });
};

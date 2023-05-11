const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    password : 'Nacho42820534_',
    database : 'financeapp'
  }
});

  module.exports = knex
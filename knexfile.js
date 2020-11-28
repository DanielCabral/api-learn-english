module.exports = {

  
    development: {      
      client: 'mysql',
      connection: {
        host: 'us-cdbr-east-02.cleardb.com',
        database: 'heroku_2b58cdacaab391e',
        user:     'b0c38f9eb9cb49',
        password: '9932d5d2'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations:{
          directory:"./src/database/migrations"
      },
      useNullAsDefault: true
    },
    staging: {
      client: 'mysql',
      connection: {
        host: 'db4free.net',
        database: 'makerblocks',
        user:     'makerblocks',
        password: 'abc.1234'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations:{
          directory:"./src/database/migrations"
      },
      useNullAsDefault: true
    },
  
    production: {
      client: 'mysql',
      connection: {
        host: 'db4free.net',
        database: 'makerblocks',
        user:     'makerblocks',
        password: 'abc.1234'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations:{
          directory:"./src/database/migrations"
      },
      useNullAsDefault: true
    },
  
  };
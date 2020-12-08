module.exports = {

  
    development: {      
      client: 'mysql',
      //mysql://bb3f30639486b2:862c56b8@us-cdbr-east-02.cleardb.com/heroku_d3a9b580de36c15?reconnect=true
      connection: {
        host: 'us-cdbr-east-02.cleardb.com',
        database: 'heroku_2b58cdacaab391e',
        user:     'b0c38f9eb9cb49',
        password: '9932d5d2'
      },
      migrations:{
          directory:"./src/database/migrations"
      },
      useNullAsDefault: true
    },
    staging:  {      
      client: 'mysql',
      connection: {
        host: 'us-cdbr-east-02.cleardb.com',
        database: 'heroku_2b58cdacaab391e',
        user:     'b0c38f9eb9cb49',
        password: '9932d5d2'
      },
      migrations:{
          directory:"./src/database/migrations"
      },
      useNullAsDefault: true
    },
  
    production:  {      
      client: 'mysql',
      connection: {
        host: 'us-cdbr-east-02.cleardb.com',
        database: 'heroku_2b58cdacaab391e',
        user:     'b0c38f9eb9cb49',
        password: '9932d5d2'
      },
      migrations:{
          directory:"./src/database/migrations"
      },
      useNullAsDefault: true
    },
  
  };
module.exports = {

  
    development: {      
      client: 'mysql',
      //mysql://bb3f30639486b2:862c56b8@us-cdbr-east-02.cleardb.com/heroku_d3a9b580de36c15?reconnect=true
      connection: {
        host: 'us-cdbr-east-02.cleardb.com',
        database: 'heroku_d3a9b580de36c15',
        user:     'bb3f30639486b2',
        password: '862c56b8'
      },
      migrations:{
          directory:"./src/database/migrations"
      },
      useNullAsDefault: true
    },
    staging:  {      
      client: 'mysql',
      connection: {
<<<<<<< HEAD
        host: 'us-cdbr-east-02.cleardb.com',
        database: 'heroku_2b58cdacaab391e',
        user:     'b0c38f9eb9cb49',
        password: '9932d5d2'
=======
      host: 'us-cdbr-east-02.cleardb.com',
      database: 'heroku_d3a9b580de36c15',
      user:     'bb3f30639486b2',
      password: '862c56b8'
      },
      pool: {
        min: 2,
        max: 10
>>>>>>> 6b234b111a4714631da4fbc62a87b2a8214752ab
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
<<<<<<< HEAD
        database: 'heroku_2b58cdacaab391e',
        user:     'b0c38f9eb9cb49',
        password: '9932d5d2'
=======
        database: 'heroku_d3a9b580de36c15',
        user:     'bb3f30639486b2',
        password: '862c56b8'
      },
      pool: {
        min: 2,
        max: 10
>>>>>>> 6b234b111a4714631da4fbc62a87b2a8214752ab
      },
      migrations:{
          directory:"./src/database/migrations"
      },
      useNullAsDefault: true
    },
  
  };
require('dotenv').config();
module.exports = {
  "dev": {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DB,
    "host": process.env.MYSQL_HOST,
    "port": process.env.PORT,
    "dialect": process.env.DB_DIALECT,
    "logging": true
  },
  "test": {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DB,
    "host": process.env.MYSQL_HOST,
    "port": process.env.PORT,
    "dialect": process.env.DB_DIALECT,
    "logging": true
  },
  "prod": {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DB,
    "host": process.env.MYSQL_HOST,
    "port": process.env.PORT,
    "dialect": process.env.DB_DIALECT,
    "logging": false
  }
}

require('dotenv').config();

module.exports = {
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    jwt: process.env.PASSWORD_SALT || 'stubJWT',
  },
  optics: {
    api_key: process.env.OPTICS_API_KEY || 'stubAPIKEY',
  },
  database: {
    host: process.env.DB_CONNECTION_STRING,
    dbName: process.env.DB_NAME,
  },
};

'use strict';

require('dotenv').config();

module.exports = {
  server: {
    port: process.env.PORT || 3000
  },
  optics: {
    api_key: process.env.OPTICS_API_KEY || 'stubAPIKEY'
  },
  database: {
    connectionString: process.env.DB_CONNECTION_STRING
  }
};
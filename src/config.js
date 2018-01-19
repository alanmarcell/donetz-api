
require('dotenv').config();

module.exports = {
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    jwt: process.env.JWT || 'stubJWT',
  },
  optics: {
    api_key: process.env.OPTICS_API_KEY || 'stubAPIKEY',
  },
};

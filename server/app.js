const path = require('path');
const AutoLoad = require('fastify-autoload');
const helmet = require('fastify-helmet');
const cors = require('fastify-cors');

module.exports = async function (fastify, opts) {
  fastify.register(helmet);
  fastify.register(cors);

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: { ...opts },
  });
};

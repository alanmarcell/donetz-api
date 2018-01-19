'use strict';

let StartServer = (() => {
  var _ref = _asyncToGenerator(function* () {
    const server = new _hapi2.default.server({
      port: _config2.default.server.port
    });

    yield server.register({
      plugin: _apolloServerHapi.graphiqlHapi,
      options: {
        path: '/graphiql',
        graphiqlOptions: {
          endpointURL: '/graphql'
        }
      }
    });

    yield server.register({
      plugin: _apolloServerHapi.graphqlHapi,
      options: {
        path: '/graphql',
        graphqlOptions: {
          schema,
          tracing: true,
          cacheControl: true
        },
        route: {
          cors: true
        }
      }
    });

    try {
      yield server.start();

      engine.start();
    } catch (err) {
      console.log(`Error while starting server: ${err.message}`);
    }

    console.log(`Server running at: ${server.info.uri}`);
  });

  return function StartServer() {
    return _ref.apply(this, arguments);
  };
})();

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _apolloServerHapi = require('apollo-server-hapi');

var _graphqlTools = require('graphql-tools');

var _apolloEngine = require('apollo-engine');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const HOST = 'localhost';
const PORT = 3003;
const todos = [{
  title: "Create a Todo App",
  author: 'Polutz',
  id: 1
}, {
  title: 'Create a Todo in this app',
  author: 'Alan Marcell',
  id: 2
}];
const typeDefs = `
  type Query { todos: [Todo] }
  type Todo { title: String!, author: String!, id:ID! }
`;

// The resolvers
const resolvers = {
  Query: { todos: () => todos }
};

// Put together a schema
const schema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs,
  resolvers
});

const engine = new _apolloEngine.Engine({
  engineConfig: {
    apiKey: _config2.default.optics.api_key,
    logging: {
      level: 'DEBUG' // Engine Proxy logging level. DEBUG, INFO, WARN or ERROR
    }
  },
  graphqlPort: _config2.default.server.port
});

StartServer();
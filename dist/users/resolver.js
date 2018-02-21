'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = undefined;

var _ptzUserRepository = require('ptz-user-repository');

var _ptzUserApp = require('ptz-user-app');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _core = require('../core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const DB_CONNECTION_STRING = _config2.default.database.connectionString;
const todos = [{
  title: 'Create a Todo App',
  author: 'Polutz',
  id: 1
}, {
  title: 'Create a Todo in this app',
  author: 'Alan Marcell',
  id: 2
}];

const resolvers = {
  Query: {
    todos: () => todos
  },
  Mutation: {
    createUser: (() => {
      var _ref = _asyncToGenerator(function* (root, args) {

        const db = yield (0, _core.getDb)(DB_CONNECTION_STRING);

        const UserDb = yield (0, _core.getConnectedDb)(db, 'donetz_dev');

        console.log(' --- UserDb --- ', UserDb);
        const userRepository = yield (0, _core.getDbCollection)(UserDb, 'users');

        const saveUserArgs = {
          userArgs: args.input,
          authedUser: 'user'
        };

        console.log(' --- userRepository --- ', userRepository);
        const resp = yield (0, _core.save)(userRepository, saveUserArgs);

        return resp;
      });

      return function createUser(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    })()
  }
};

exports.default = resolvers;
exports.resolvers = resolvers;
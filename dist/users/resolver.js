'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _core = require('../core');

var _ptzLog = require('ptz-log');

var _Controller = require('./Controller');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var DB_CONNECTION_STRING = _config2.default.database.connectionString;
var _todos = [{
  title: 'Create a Todo App',
  author: 'Polutz',
  id: 1
}, {
  title: 'Create a Todo in this app',
  author: 'Alan Marcell',
  id: 2
}];

var resolvers = {
  Query: {
    todos: function todos() {
      return _todos;
    }
  },
  Mutation: {
    createUser: function () {
      var _ref = _asyncToGenerator(function* (root, args) {
        var db = yield (0, _core.getDb)(DB_CONNECTION_STRING);

        var UserDb = yield (0, _core.getConnectedDb)(db, 'donetz_dev');

        var userRepository = yield (0, _core.getDbCollection)(UserDb, 'users');

        var saveUserArgs = _ramda2.default.merge({
          createdBy: 'self'
        }, args.user);

        var resp = yield (0, _Controller.createUser)(userRepository, saveUserArgs);
        return resp;
      });

      return function createUser(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  }
};

exports.default = resolvers;
exports.resolvers = resolvers;
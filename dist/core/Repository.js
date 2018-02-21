'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDbCollection = exports.getConnectedDb = exports.getDb = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _mongodb = require('mongodb');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// const DB_CONNECTION_STRING = config.database.connectionString;

const getDb = (() => {
  var _ref = _asyncToGenerator(function* (url) {
    return _mongodb.MongoClient.connect(url);
  });

  return function getDb(_x) {
    return _ref.apply(this, arguments);
  };
})();

const getConnectedDb = _ramda2.default.curry((db, dbName) => db.db(dbName));

const getDbCollection = _ramda2.default.curry((db, collectionName) => db.collection(collectionName));

// const db = getDb(DB_CONNECTION_STRING);

exports.getDb = getDb;
exports.getConnectedDb = getConnectedDb;
exports.getDbCollection = getDbCollection;
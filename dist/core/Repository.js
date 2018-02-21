'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.save = exports.getDbCollection = exports.getConnectedDb = exports.getDb = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _mongodb = require('mongodb');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// const DB_CONNECTION_STRING = config.database.connectionString;

var getDb = function () {
  var _ref = _asyncToGenerator(function* (url) {
    return _mongodb.MongoClient.connect(url);
  });

  return function getDb(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getConnectedDb = _ramda2.default.curry(function (db, dbName) {
  return db.db(dbName);
});

var getDbCollection = _ramda2.default.curry(function (db, collectionName) {
  return db.collection(collectionName);
});

var save = _ramda2.default.curry(function () {
  var _ref2 = _asyncToGenerator(function* (collection, entity) {
    var result = yield collection.replaceOne({ _id: entity.id }, entity, { upsert: true });

    return result.ops[0];
  });

  return function (_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}());

exports.getDb = getDb;
exports.getConnectedDb = getConnectedDb;
exports.getDbCollection = getDbCollection;
exports.save = save;
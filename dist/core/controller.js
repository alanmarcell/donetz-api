'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDbCollection = exports.save = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const getDbCollection = _ramda2.default.curry((db, collectionName) => db.collection(collectionName));

const save = _ramda2.default.curry((() => {
  var _ref = _asyncToGenerator(function* (collection, entity) {
    const result = yield collection.replaceOne({ _id: entity.id }, entity, { upsert: true });

    return result.ops[0];
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

exports.save = save;
exports.getDbCollection = getDbCollection;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResourceError = exports.create = undefined;

var _apolloErrors = require('apollo-errors');

var _Repository = require('./Repository');

var Repository = _interopRequireWildcard(_Repository);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var create = function () {
  var _ref = _asyncToGenerator(function* (collection, entity) {
    var repositoryRes = yield Repository.save(collection, entity);

    return repositoryRes;
  });

  return function create(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var ResourceError = (0, _apolloErrors.createError)('ResourceError', {
  message: 'Invalid Resource'
});

exports.create = create;
exports.ResourceError = ResourceError;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = undefined;

var _ptzLog = require('ptz-log');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _Repository = require('../core/Repository');

var CoreRepository = _interopRequireWildcard(_Repository);

var _Repository2 = require('./Repository');

var UserRepository = _interopRequireWildcard(_Repository2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var create = function () {
  var _ref = _asyncToGenerator(function* (collection, entity) {

    (0, _ptzLog.log)(' ------ entity -----', entity);
    var otherUsers = yield UserRepository.getOtherUsersWithSameUserNameOrEmail(collection, entity.userArgs);

    (0, _ptzLog.log)('otherUsers', otherUsers);

    var user = _ramda2.default.merge({
      // ...entity.userArgs,
      id: entity.userArgs.id || _shortid2.default.generate
    }, entity.userArgs);

    (0, _ptzLog.log)(' ------ user -----', user);

    var repositoryRes = yield CoreRepository.save(collection, user);

    (0, _ptzLog.log)('repositoryRes', repositoryRes);

    return repositoryRes;
  });

  return function create(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.create = create;
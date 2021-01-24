"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerExpress = require("apollo-server-express");

var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));

var _auth = _interopRequireDefault(require("../../config/auth"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _verify = require("../../config/verify.js");

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var _default = {
  Query: {
    users: function users(parent, args, _ref) {
      var req = _ref.req,
          User = _ref.User;
      var user = (0, _auth["default"])(req);
      return User.find({});
    },
    userId: function userId(parent, args, _ref2) {
      var req = _ref2.req,
          User = _ref2.User;
      var user = (0, _auth["default"])(req);
      return User.findById(args.id);
    },
    login: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(paren, _ref3, _ref4) {
        var input, User, user, isEqual, token;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                input = _ref3.input;
                User = _ref4.User;
                _context.next = 4;
                return _verify.signIn.validate(input, {
                  abortEarly: false
                });

              case 4:
                _context.prev = 4;
                _context.next = 7;
                return User.findOne({
                  email: input.email
                });

              case 7:
                user = _context.sent;

                if (user) {
                  _context.next = 10;
                  break;
                }

                throw new _apolloServerExpress.UserInputError('User  not found');

              case 10:
                _context.next = 12;
                return _bcryptNodejs["default"].compareSync(input.password, user.password);

              case 12:
                isEqual = _context.sent;

                if (isEqual) {
                  _context.next = 15;
                  break;
                }

                throw new _apolloServerExpress.UserInputError('Wrong credentials!');

              case 15:
                token = _jsonwebtoken["default"].sign({
                  user: user
                }, process.env.SECRET_TOKEN, {
                  expiresIn: 60 * 60
                });
                return _context.abrupt("return", {
                  token: token
                });

              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](4);
                throw _context.t0;

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 19]]);
      }));

      function login(_x, _x2, _x3) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  },
  Mutation: {
    register: function () {
      var _register = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(paren, _ref5, _ref6) {
        var input, User, user, newUser, saveduser, token;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                input = _ref5.input;
                User = _ref6.User;
                _context2.next = 4;
                return _verify.signUp.validate(input, {
                  abortEarly: false
                });

              case 4:
                _context2.prev = 4;
                _context2.next = 7;
                return User.findOne({
                  email: input.email
                });

              case 7:
                user = _context2.sent;

                if (!user) {
                  _context2.next = 10;
                  break;
                }

                throw new _apolloServerExpress.UserInputError('User already Exists');

              case 10:
                newUser = new User({
                  fullName: input.fullName,
                  email: input.email,
                  password: input.password
                });
                saveduser = newUser.save();
                token = _jsonwebtoken["default"].sign({
                  saveduser: saveduser
                }, process.env.SECRET_TOKEN, {
                  expiresIn: 60 * 60
                });
                return _context2.abrupt("return", {
                  token: token
                });

              case 16:
                _context2.prev = 16;
                _context2.t0 = _context2["catch"](4);
                throw _context2.t0;

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[4, 16]]);
      }));

      function register(_x4, _x5, _x6) {
        return _register.apply(this, arguments);
      }

      return register;
    }()
  }
};
exports["default"] = _default;
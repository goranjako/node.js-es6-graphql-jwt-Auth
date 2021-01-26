"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServer = require("apollo-server");

var _verify = require("../../config/verify");

var _default = {
  Query: {
    todos: function todos(parent, args, _ref) {
      var Todo = _ref.Todo;
      return Todo.find({});
    },
    todoId: function todoId(parent, args, _ref2) {
      var Todo = _ref2.Todo,
          User = _ref2.User;
      return Todo.find({
        userId: args.userId
      });
    }
  },
  Mutation: {
    addTodo: function () {
      var _addTodo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(paren, _ref3, _ref4) {
        var input, Todo, todos;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                input = _ref3.input;
                Todo = _ref4.Todo;
                _context.next = 4;
                return _verify.user.validate(input, {
                  abortEarly: false
                });

              case 4:
                todos = new Todo({
                  userId: input.userId,
                  item: input.item,
                  complete: input.complete
                });
                return _context.abrupt("return", todos.save());

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function addTodo(_x, _x2, _x3) {
        return _addTodo.apply(this, arguments);
      }

      return addTodo;
    }()
  }
};
exports["default"] = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerExpress = require("apollo-server-express");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\ntype Todo {\n  id:ID!\n  userId:String!\n  item:String!\n  complete:Boolean!\n}\n extend type Query {\n    todos:[Todo!]\n    todoId(userId:String):[Todos!]!\n  \n  }\n  type Todos {\n    userId:String!\n    item:String!\n    complete:Boolean!\n  }\n  input todoInput {\n  userId:ID!\n  item:String!,\n  complete:Boolean!\n  }\n  extend type Mutation { \n    addTodo(input:todoInput!):Todo!\n  }\n \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var todo = (0, _apolloServerExpress.gql)(_templateObject());
var _default = todo;
exports["default"] = _default;
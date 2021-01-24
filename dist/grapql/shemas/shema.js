"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerExpress = require("apollo-server-express");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\ntype User {\n  id:ID!\n  fullName:String!\n  email:String!,\n  password:String!\n}\nextend type Query {\n    users:[User!]!\n    userId(id:ID):User!\n    login(input:loginInput!):AuthData!\n  }\n  input userInput {\n    fullName:String!\n  email:String!,\n  password:String!\n  }\n  input loginInput {\n  email:String!,\n  password:String!\n  }\n  type AuthData {\n    token: String! \n  }\n  extend type Mutation { \n    register(input:userInput!):AuthData!\n   \n  }\n \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var user = (0, _apolloServerExpress.gql)(_templateObject());
var _default = user;
exports["default"] = _default;
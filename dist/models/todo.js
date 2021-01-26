"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

//const user = require('./user');
var Schema = _mongoose["default"].Schema;
var TodoSchema = new Schema({
  userId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  item: {
    type: String,
    required: true,
    unique: true
  },
  complete: {
    type: Boolean,
    "default": false
  }
});
module.exports = _mongoose["default"].model('Todo', TodoSchema);
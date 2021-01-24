"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user = exports.signIn = exports.signUp = void 0;

var yup = _interopRequireWildcard(require("yup"));

/**
 * USER MODEL Validation Rules
 */
var fullName = yup.string().required('Username is required.').min(5, 'Username should have atleast 5 characters.').max(20, 'Username should have atmost 10 characters.').matches(/^\w+$/, 'Should be alphanumeric.');
var password = yup.string().required('password is required.').min(3, 'password should have atleast 5 characters.').max(20, 'Username should have atmost 10 characters.');
var email = yup.string().required('Email is required.').email('This is invalid email.');
var userId = yup.string().required('userId is required.');
var item = yup.string().required('item is required.'); // User Registeration Validation Schema

var signUp = yup.object().shape({
  email: email,
  fullName: fullName,
  password: password
});
exports.signUp = signUp;
var signIn = yup.object().shape({
  email: email,
  password: password
});
exports.signIn = signIn;
var user = yup.object().shape({
  userId: userId,
  item: item
});
exports.user = user;
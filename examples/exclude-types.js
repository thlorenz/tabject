'use strict';

var tabject = require('../');

var obj = {
  foo: 'bar',
  fn: function () {},
  num: 1
};

// by default all functions are excluded
console.log(tabject(obj));
// =>
// foo  "bar"
// num  1

console.log('======================');

// we can customize what types get excluded
console.log(tabject(obj, { excludeTypes: [ 'string' ] }));
// =>
// fn   [function]
// num  1

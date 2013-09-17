'use strict';

var tabject = require('../');

var obj = {
  foo: 'bar',
  num: 1
};

console.log(tabject(obj, { excludeKeys: [ 'num' ]}));

// =>
// foo  "bar"

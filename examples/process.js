'use strict';
var tabject = require('../');
console.log(tabject(process, { maxValueLength: 100, excludeKeys: [ 'env' ] }));

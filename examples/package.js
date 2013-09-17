'use strict';

var pack = require('../package');
var tabject = require('../');

// we can fix value and key lengths
console.log(tabject(pack, { maxKeyLength: 10,  maxValueLength: 60, table: { hsep: ' : ' } }));

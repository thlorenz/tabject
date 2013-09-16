'use strict';
var table = require('text-table');

var go = module.exports = function (obj, opts) {
  opts = opts || {};
  var maxValueLength = Math.min(opts.maxValueLength, Infinity)
    , maxKeyLength = Math.min(opts.maxKeyLength, Infinity)
    , excludeTypes = opts.excludeTypes || [ 'function' ]
    , excludeKeys = opts.excludeKeys || [];

  var rows = Object.keys(obj).reduce(reducer, []);

  function reducer (acc, k) {
    if (~excludeKeys.indexOf(k)) return acc;

    var val = obj[k];
    var valType = typeof val;
    if (~excludeTypes.indexOf(valType)) return acc;

    var s;

         if (valType === 'function') s = '[function]';
    else if (valType === 'undefined') s = 'undefined';
    else if (val === null) s = 'null';
    else {
      try {
        s = JSON.stringify(val);
      } catch (e) {
        s = val.toString();
      }
    }

    if (k.length > maxKeyLength) k = k.slice(0, maxKeyLength - 3) + '...';
    if (s.length > maxValueLength) s = s.slice(0, maxValueLength - 3) + '...';
    acc.push([k, s]);  
    return acc;
  }

  return table(rows, {}); 
};

// Test
if (!module.parent) {
  var obj = {
    foo: 'bar',
    len : 1,
    obj: { prop1: 'hello', prop2: 'world' }
  };
  var pack = require('../package');
  console.log(go(pack, { maxValueLength: 100 }))
}

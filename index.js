'use strict';
var table = require('text-table');

/**
 * Returns a string that represents the object in a tabular manner.
 * 
 * @name tabject
 * @function
 * @param obj {Object} any JavaScript object
 * @param opts {Object} with the following properties:
 *  - maxKeyLength: {Number} limits the maximum number of chars for the object keys that are printed
 *  - maxValueLength: {Number} limits the maximum number of chars for the object values that are printed
 *  - excludeKeys: {Array[String]} excludes given keys from the tabularized string
 *  - excludeTypes: {Array[String]} excludes key and values from the tabularized string if the value is of any of the 
 *    given types (default ['function'])
 *  - table: {Object} options passed through to text-table to configure alignment and horizontal separator
 *  @return {String} tabularized object string
 */
var tabject = module.exports = function (obj, opts) {
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

  return table(rows, opts.table); 
};

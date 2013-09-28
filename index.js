'use strict';
var table = require('text-table');

function noopWrap (keyOrVal, type) {
  return keyOrVal;
}

/**
 * Returns a string that represents the object in a tabular manner.
 * 
 * @name tabject
 * @function
 * @param obj {Array|Object} to tabularize 
 * @param opts {Object} with the following properties:
 *  - maxKeyLength: {Number} limits the maximum number of chars for the object keys that are printed
 *  - maxValueLength: {Number} limits the maximum number of chars for the object values that are printed
 *  - excludeKeys: {Array[String]} excludes given keys from the tabularized string
 *  - excludeTypes: {Array[String]} excludes key and values from the tabularized string if the value is of any of the 
 *  - wrapKey: {Function} invoked with with (key, valueType), return from it whatever you want to replace the key with
 *  - wrapValue: {Function} invoked with with (value, valueType), return from it whatever you want to replace the value with
 *    given types (default ['function'])
 *  - tab: {String} used to indent array elements (default: `\t`)
 *  - table: {Object} options passed through to text-table to configure alignment and horizontal separator
 *  @return {String} tabularized object string
 */
var tabject = module.exports = function tabject (obj, opts) {
  opts = opts || {};

  var wrapKey = opts.wrapKey || noopWrap  
    , wrapValue = opts.wrapValue || noopWrap

  var maxValueLength =  Math.min(opts.maxValueLength, Infinity)
    , maxKeyLength   =  Math.min(opts.maxKeyLength, Infinity)
    , excludeTypes   =  opts.excludeTypes || [ 'function' ]
    , excludeKeys    =  opts.excludeKeys || []
    , tab            =  opts.tab || '\t';

  function arrayReducer(acc, o, idx) { 
    // not worrying about stackoverflow right now although that could become an issue
    var index = (idx === 0 ? ' ': '  ') + idx + ':\n' + tab;
    var values = tabject(o, opts).split('\n').join('\n' + tab) + '\n'; 
    return acc + index + values;
  }

  if (Array.isArray(obj))         return '[' + obj.reduce(arrayReducer, '') + ']';
  if (obj === null)               return 'null';
  if (obj === undefined)          return 'undefined';
  if (typeof obj  === 'function') return '[function]';
  if (Buffer.isBuffer(obj))       return 'Buffer: [' + obj.toString() + ']';
  if (typeof obj !== 'object')    return obj.toString();

  var rows = Object.keys(obj).reduce(reducer, []);

  function reducer (acc, k) {
    if (~excludeKeys.indexOf(k)) return acc;

    var val = obj[k];
    var valType = typeof val;
    if (~excludeTypes.indexOf(valType)) return acc;

    var s;

         if (valType === 'function')  s = '[function]';
    else if (Buffer.isBuffer(val)) { 
            valType = 'buffer'; 
            s = 'Buffer: [' + val.toString() + ']'; 
         }
    else if (valType === 'undefined') s = 'undefined';
    else if (val === null)            s = 'null';
    else {
      try {
        s = JSON.stringify(val);
      } catch (e) {
        s = val.toString();
      }
    }

    if (k.length > maxKeyLength) k = k.slice(0, maxKeyLength - 3) + '...';
    if (s.length > maxValueLength) s = s.slice(0, maxValueLength - 3) + '...';
    acc.push([wrapKey(k, valType), wrapValue(s, valType)]);  
    return acc;
  }

  return table(rows, opts.table); 
};

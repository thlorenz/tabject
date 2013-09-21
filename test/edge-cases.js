'use strict';
/*jshint asi: true */

var test = require('tape')
var tabject = require('../')

function inspect(obj, depth) {
  return require('util').inspect(obj, false, depth || 5, true);
}

function check(t, obj, expected, debug) {
  var res = tabject(obj)  
  if (debug) console.log(inspect(res.split('\n')))
  t.deepEqual(res.split('\n'), expected, 'tabject(' + inspect(obj) + ') => ' + expected)
}

test('\nedge cases', function (t) {
  check(t ,  1                          ,  [ '1' ])
  check(t ,  null                       ,  [ 'null' ])
  check(t ,  undefined                  ,  [ 'undefined' ])
  check(t ,  'foo'                      ,  [ 'foo' ])
  check(t ,  new Buffer('foo')          ,  [ 'Buffer: [foo]' ])
  check(t ,  { buf: new Buffer('foo') } ,  [ 'buf  Buffer: [foo]' ])
  t.end();
})


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

test('\narray of primitives', function (t) {
  check(t
    , [ 1, 2, 3 ]
    , [ '[ 0:	1'
      , '  1:	2'
      , '  2:	3'
      , ']'
      ]
  )
  
  check(t
    , [ '1', '2', '3' ]
    , [ '[ 0:	1'
      , '  1:	2'
      , '  2:	3'
      , ']'
      ]
  )

  t.end()
})

test('\nmixed types', function (t) {
  check(t
    , [ null, '2', undefined ]
    , [ '[ 0:	null'
      , '  1:	2'
      , '  2:	undefined'
      , ']'
      ]
  )

  check(t
    , [ [], { foo: 'bar' }, undefined ]
    , [ '[ 0:\t[ ]',
        '  1:\tfoo  "bar"',
        '  2:\tundefined',
        ']' 
      ]
  )
  t.end()
})

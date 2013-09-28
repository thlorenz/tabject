'use strict';
/*jshint asi: true */

var test = require('tape')
var tabject = require('../')

function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true));
}

test('when I override the key render function', function (t) {
  var obj = {
      hello :  'world'
    , times :  1
    , foo   :  { bar: 'foo-bar' }
    , lots  :  [ 1, 2, 3 ]
    , nada  :  null
    , not   :  undefined
    , buf   :  new Buffer('hi')
    , yes   :  true
  }

  var opts = {
      wrapKey: wrapKey
    , wrapValue: wrapValue
  }

  function wrapKey (k, valType) {
    if (k === 'hello') return ':' + k + ':';
    if (valType == 'number') return k.toUpperCase();
    return k;
  }

  function wrapValue (v, valType) {
    if (valType === 'boolean') return 'red' + v + '/red';
    if (v === 'undefined') return 'not known I guess';
    if (valType === 'number') return 'blue' + v + '/blue';
    if (valType === 'buffer') return '<' + v + '>';
    return v;
  }

  var res = tabject(obj, opts)

  t.deepEqual(
      res.split('\n')
    , [ ':hello:  "world"',
        'TIMES    blue1/blue',
        'foo      {"bar":"foo-bar"}',
        'lots     [1,2,3]',
        'nada     null',
        'not      not known I guess',
        'buf      <Buffer: [hi]>',
        'yes      redtrue/red' ]
    , 'wraps keys and values as configured'
  )
  
  t.end()
})

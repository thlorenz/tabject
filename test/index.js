'use strict';
/*jshint asi: true */

var test = require('tape')
var textTablePackage = require('./fixtures/text-table-package')
var tabject = require('../')

test('\ntext-table package no max lengths', function (t) {
  var res = tabject(textTablePackage)  
  t.equal(res, [
      'name             "text-table"'
    , 'version          "0.1.1"'
    , 'description      "borderless text tables with alignment"'
    , 'main             "index.js"'
    , 'devDependencies  {"tap":"~0.4.0","tape":"~1.0.2"}'
    , 'scripts          {"test":"tap test/*.js"}'
    , 'testling         {"files":"test/*.js","browsers":["ie/6..latest","chrome/20..latest","firefox/10..latest","safari/latest","opera/11.0..latest","iphone/6","ipad/6"]}'
    , 'repository       {"type":"git","url":"git://github.com/substack/text-table.git"}'
    , 'homepage         "https://github.com/substack/text-table"'
    , 'keywords         ["text","table","align","ascii","rows","tabular"]'
    , 'author           {"name":"James Halliday","email":"mail@substack.net","url":"http://substack.net"}'
    , 'license          "MIT"'
    ].join('\n')
  )
  t.end()
})

test('\ntext-table package with max value length', function (t) {
  var res = tabject(textTablePackage, { maxValueLength: 50 })  
  t.equal(res, [
      'name             "text-table"'
    , 'version          "0.1.1"'
    , 'description      "borderless text tables with alignment"'
    , 'main             "index.js"'
    , 'devDependencies  {"tap":"~0.4.0","tape":"~1.0.2"}'
    , 'scripts          {"test":"tap test/*.js"}'
    , 'testling         {"files":"test/*.js","browsers":["ie/6..latest"...'
    , 'repository       {"type":"git","url":"git://github.com/substack/...'
    , 'homepage         "https://github.com/substack/text-table"'
    , 'keywords         ["text","table","align","ascii","rows","tabular"]'
    , 'author           {"name":"James Halliday","email":"mail@substack...'
    , 'license          "MIT"'
    ].join('\n')
  )

  t.end()
})

test('\ntext-table package with max key and value length', function (t) {
  var res = tabject(textTablePackage, { maxKeyLength: 10,  maxValueLength: 50 })  
  t.equal(res, [
      'name        "text-table"'
    , 'version     "0.1.1"'
    , 'descrip...  "borderless text tables with alignment"'
    , 'main        "index.js"'
    , 'devDepe...  {"tap":"~0.4.0","tape":"~1.0.2"}'
    , 'scripts     {"test":"tap test/*.js"}'
    , 'testling    {"files":"test/*.js","browsers":["ie/6..latest"...'
    , 'repository  {"type":"git","url":"git://github.com/substack/...'
    , 'homepage    "https://github.com/substack/text-table"'
    , 'keywords    ["text","table","align","ascii","rows","tabular"]'
    , 'author      {"name":"James Halliday","email":"mail@substack...'
    , 'license     "MIT"'
    ].join('\n')
  )

  t.end()
})


test('\ndoesn\'t choke on circular data structures', function (t) {
  var obj = { 
    foo: { 
      bar: { prim: 1 } 
    },
    shoe: 'sock'
  }
  obj.foo.bar.obj = obj;

  var res = tabject(obj);
  t.equal(res, [
        'foo   [object Object]'
      , 'shoe  "sock"'
      ].join('\n')
    , 'falls back to toString since JSON.stringify fails'
  )
  t.end()
})

test('\nfunctions are excluded by default', function (t) {
  var obj = { foo: 'bar', fn: function () { } };
  var res = tabject(obj)
  t.equal(res, 'foo  "bar"');
  t.end()
})

test('\nfunctions are included when excludeTypes is set to empty', function (t) {
  var obj = { foo: 'bar', fn: function () { } };
  var res = tabject(obj, { excludeTypes: []  })
  t.equal(res, [
      'foo  "bar"'
    , 'fn   [function]'
  ].join('\n'))
  t.end()
})

test('\nstrings are excluded when excludeTypes is set to [ string ]', function (t) {
  var obj = { foo: 'bar', fn: function () { } };
  var res = tabject(obj, { excludeTypes: [ 'string' ]  })
  t.equal(res, 'fn  [function]')
  t.end()
})

test('\nby default all keys are included', function (t) {
  var obj = { key1: 1, key2: 2 }
  var res = tabject(obj)
  t.equal(res, [
      'key1  1'
    , 'key2  2'
  ].join('\n'))
  t.end()
})

test('\nkey1 is excluded when I excludeKeys is set to [ key1 ]', function (t) {
  var obj = { key1: 1, key2: 2 }
  var res = tabject(obj, { excludeKeys: [ 'key1' ] })
  t.equal(res, 'key2  2')
  t.end()
})

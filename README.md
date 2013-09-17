# tabject [![build status](https://secure.travis-ci.org/thlorenz/tabject.png)](http://travis-ci.org/thlorenz/tabject)

[![testling badge](https://ci.testling.com/thlorenz/tabject.png)](https://ci.testling.com/thlorenz/tabject)

Creates a text table from a given object.

```js
var pack = require('../package');
var tabject = require('tabject');

console.log(tabject(pack, { maxKeyLength: 10,  maxValueLength: 60 }));
```

```
name        "tabject"
version     "0.1.0"
descrip...  "Creates a text table from a given object."
main        "index.js"
scripts     {"test-main":"tap test/*.js","test-0.8":"nave use 0.8 npm...
repository  {"type":"git","url":"git://github.com/thlorenz/tabject.git"}
homepage    "https://github.com/thlorenz/tabject"
depende...  {"text-table":"~0.1.1"}
devDepe...  {"nave":"~0.4.3","tape":"~1.0.4","tap":"~0.4.3"}
keywords    ["table","format","object","render","align","tabular"]
author      {"name":"Thorsten Lorenz","email":"thlorenz@gmx.de","url"...
license     {"type":"MIT","url":"https://github.com/thlorenz/tabject/...
engine      {"node":">=0.6"}
testling    {"files":"test/*.js","browsers":["ie/8..latest","firefox/..
```

## Installation

    npm install tabject

## API

###*tabject(obj, opts)*

## License

MIT

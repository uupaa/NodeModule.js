# NodeModule.js [![Build Status](https://travis-ci.org/uupaa/NodeModule.js.png)](http://travis-ci.org/uupaa/NodeModule.js)

[![npm](https://nodei.co/npm/uupaa.nodemodule.js.png?downloads=true&stars=true)](https://nodei.co/npm/uupaa.nodemodule.js/)

Node Module Utility.

## Document

- [NodeModule.js wiki](https://github.com/uupaa/NodeModule.js/wiki/NodeModule)
- [Development](https://github.com/uupaa/WebModule/wiki/Development)
- [WebModule](https://github.com/uupaa/WebModule) ([Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html))


## How to use

### Node.js

List up dependency modules.

```js
var NodeModule = require("lib/NodeModule.js");

console.log( JSON.stringify(NodeModule.files(), null, 2) );
```


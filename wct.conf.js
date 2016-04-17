/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
var proxyMiddleware = require('http-proxy-middleware');

// Configure proxy for Hoodie's api
var proxy = proxyMiddleware('/_api', {
  // target: 'http://localhost:3002/_api'
  target: {
    port: 3002,
    host: 'localhost'
  }
});

module.exports = {
  verbose: true,
  suites: ['test'],
  plugins: {
    local: {
        browsers: ['firefox']
    }
  },
  registerHooks: function(wct) {
    wct.hook('prepare:webserver', function(app, done){
      app.use(proxy);
      done();
    });
  }
};

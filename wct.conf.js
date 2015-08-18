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

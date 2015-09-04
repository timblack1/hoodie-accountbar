'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var merge = require('merge-stream');
var path = require('path');
var fs = require('fs');
var glob = require('glob');
// For hoodie_js task
var http = require('http');
var spawn = require('child_process').spawn;
// var connect = require('gulp-connect');
// For browserSync proxy middleware
var proxyMiddleware = require('http-proxy-middleware');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src([
      'hoodie-accountbar.html',
      'test/integration-test.html'
    ])
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint.extract()) // Extract JS from .html files
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('hoodie_start', function(done){
  // Start Hoodie
  spawn('node_modules/hoodie-server/bin/start', ['--custom-ports', '3002,3003,3004']);
  done();
});

gulp.task('hoodie', ['serve', 'hoodie_start'], function(){
  /*
  Copy dynamically-generated
    /_api/_files/hoodie.js
  to
    bower_components/hoodie-service/hoodie.js
  */
  setTimeout(function(){
    var file = fs.createWriteStream("bower_components/hoodie-service/hoodie.js");
    var request = http.get("http://localhost:3002/_api/_files/hoodie.js", function(response) {
      response.pipe(file);
    });
  }, 8000);
});

// Configure proxy for 'serve' and 'serve:dist' tasks
var proxy = proxyMiddleware('/_api', {
  // target: 'http://localhost:3002/_api'
  target: {
    port: 3002,
    host: 'localhost'
  }
});

// Watch Files For Changes & Reload
gulp.task('serve', ['hoodie_start'], function () {
  // Serve files
  browserSync({
    notify: false,
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: {
      baseDir: ['.'],
      routes: {
        '/components/hoodie-accountbar': '.',
        '/components': 'bower_components',
      },
      // Set up proxy for Hoodie's /_api
      middleware: [proxy]
    }
  });

  gulp.watch(['hoodie-accountbar.html', 'test/integration-test.html'], reload);
  gulp.watch(['hoodie-accountbar.html', 'test/integration-test.html'], ['jshint']);
});

// Serve docs & demo, the default task
gulp.task('default', function (cb) {
  runSequence(
    ['serve'],
    cb);
});

// Load tasks for web-component-tester
// Adds tasks for `gulp test:local` and `gulp test:remote`
// try { require('web-component-tester').gulp.init(gulp); } catch (err) {}

// Load custom tasks from the `tasks` directory
try { require('require-dir')('tasks'); } catch (err) {}

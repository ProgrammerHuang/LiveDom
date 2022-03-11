var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var clean = require('gulp-clean')
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');

function build()
{
  // Do something after a, b, and c are finished.
  return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        standalone: "LiveDom",
        // insertGlobalVars: {"LiveDom": function() { return {foo: 123}; }},
        cache: {},
        packageCache: {}
    }).
    plugin(tsify).
    // transform('babelify', {
    //   presets: ['es2015'],
    //   extensions: ['.ts']
    // }).
    bundle().
    pipe(source('livedom.js')).
    pipe(buffer()).
    pipe(sourcemaps.init({
        loadMaps: true
    })).
    pipe(uglify()).
    pipe(sourcemaps.write('./')).
    pipe(gulp.dest('dist'));
}

function watch()
{
    gulp.watch('src/**/*.ts', { delay: 1000 }, build);
}

exports.build = build;
exports.watch = watch

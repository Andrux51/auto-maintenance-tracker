'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');

var sassSource = './client/styles/**/*.scss';
var cssDest = './dist/styles';

var includedNodeCss = [
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'node_modules/bootstrap/dist/css/bootstrap-theme.css'
];

var includedNodeJs = [
    'node_modules/core-js/client/shim.min.js',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/systemjs/dist/system.src.js'
];

gulp.task('dev', ['watch']);

gulp.task('prod', ['sass']);

gulp.task('watch', ['sass:watch']);

gulp.task('sass', function() {
    // compile sass, add vendor prefixes as necessary, concatenate, then minify
    return gulp.src(sassSource)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat('styles.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(cssDest));
});

gulp.task('sass:watch', ['sass'], function() {
    gulp.watch(sassSource, ['sass']);
});

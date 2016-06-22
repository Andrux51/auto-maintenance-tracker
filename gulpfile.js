'use strict';

var gulp = require('gulp');
var del = require('del');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');

var devFolder = './client';
var distFolder = './dist';

var cssDest = './dist/styles';
var jsDest = './dist/scripts';

var sassSource = './client/styles/**/*.scss';

gulp.task('dev', ['clean', 'sass', 'build:index', 'css:vendor', 'js:vendor', 'watch']);

gulp.task('prod', ['clean', 'sass', 'build:index', 'css:vendor', 'js:vendor']);

gulp.task('watch', ['watch:sass', 'watch:index']);

gulp.task('clean', function() {
    return del.sync(['dist']);
});

gulp.task('sass', function() {
    // compile sass, add vendor prefixes as necessary, concatenate, then minify
    return gulp.src(sassSource)
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat('styles.min.css'))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest(cssDest));
});

gulp.task('watch:sass', ['sass'], function() {
    gulp.watch(sassSource, ['sass']);
});

gulp.task('css:vendor', function() {
    var vendorCss = [
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/bootstrap/dist/css/bootstrap-theme.css'
    ];

    return gulp.src(vendorCss)
        .pipe(plumber())
        .pipe(concat('vendor.css'))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest(cssDest));
});

gulp.task('js:vendor', ['js:@angular', 'js:rxjs'], function() {
    var vendorJs = [
        'node_modules/core-js/client/shim.min.js',
        'node_modules/core-js/client/shim.min.js.map',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/reflect-metadata/Reflect.js.map',
        'node_modules/systemjs/dist/system.src.js',

        'node_modules/bootstrap/dist/js/bootstrap.js'
    ];

    return gulp.src(vendorJs)
        .pipe(plumber())
        .pipe(gulp.dest(jsDest + '/vendor'));
});

gulp.task('js:rxjs', function() {
    return gulp.src(['node_modules/rxjs/**/*.js', 'node_modules/rxjs/**/*.js.map'])
        .pipe(plumber())
        .pipe(gulp.dest(jsDest + '/vendor/rxjs'));
});

gulp.task('js:@angular', function() {
    var angularPackages = [
        'common',
        'compiler',
        'core',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'router-deprecated',
        'upgrade',
    ];

    var angularSources = angularPackages.map(function(name) {
        return 'node_modules/@angular/' + name + '/' + name + '.umd.js';
    });

    return gulp.src(angularSources)
        .pipe(plumber())
        .pipe(gulp.dest(jsDest + '/@angular'));
});

gulp.task('build:index', function() {
    return gulp.src(['./client/index.html', './client/systemjs.config.js'])
        .pipe(plumber())
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch:index', ['build:index'], function() {
    gulp.watch(['./index.html', './systemjs.config.js'], ['build:index']);
});

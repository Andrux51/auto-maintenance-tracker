'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');

var sassSource = './client/styles/**/*.scss';
var cssDest = './dist/styles';

gulp.task('dev', ['watch']);

gulp.task('prod', ['sass']);

gulp.task('watch', ['sass:watch']);

gulp.task('sass', function() {
    // compile sass, add vendor prefixes as necessary, then minify
    return gulp.src(sassSource)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(cssDest));
});

gulp.task('sass:watch', ['sass'], function() {
    gulp.watch(sassSource, ['sass']);
});

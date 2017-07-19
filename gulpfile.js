'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var server = require('gulp-server-livereload');

gulp.task('sass:compile', function () {
  return gulp.src('./src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('sass', ['sass:compile', 'sass:watch']);

gulp.task('webserver', function () {
  gulp.src('./public')
    .pipe(server({
      livereload: {
        enable: true,
        filter: function (filename, cb) {
          cb( !(/\.scss$/.test(filename)) );
        }
      }
    }));
});

gulp.task('default', ['webserver', 'sass']);
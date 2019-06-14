"use strict";
var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

gulp.task('sass', function() {
    return gulp
        .src('scss/*.scss') // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass())
        .pipe(gulp.dest('css'))
});

gulp.task('assets', function() {
    return gulp
        .src('assets/**/*')
        .pipe(gulp.dest('public'))
});

function compile(watch){
     var bundle= watchify(browserify('src/index.js'));

     function redbundle() {
         bundle
             .transform(babel)
             .bundle()
             .pipe(source('index.js'))
             .pipe(rename('app.js'))
             .pipe(gulp.dest('public/js'));

     }
     
     if (watch){
        bundle.on('update', function () {
            console.log('--> Bulding...');
            redbundle();

        });
         
      }
     redbundle();
}

gulp.task('build',function () {
    return compile();
});
gulp.task('watch',function () {
    return compile(true);
});
gulp.task('default', function(){
    gulp.watch('scss/*.scss', gulp.series('sass'));
    gulp.watch('assets/**/*', gulp.series('assets'));
    gulp.watch('src/index.js', gulp.series('watch'));
    // Other watchers
});
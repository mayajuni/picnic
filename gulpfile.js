/**
 * Created by 동준 on 2015-05-03.
 */
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    templateCache = require('gulp-angular-templatecache'),
    minifyHTML = require('gulp-minify-html');

/* console.log 같은거 제거해주는거 */
var stripDebug = require('gulp-strip-debug');

// Styles
gulp.task('styles', function() {
    return gulp.src([
        'public/src/css/*.css'
    ])
        .pipe(concatCss('app.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('public/dist/css'));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src('public/src/js/**/*.js')
        .pipe(concat('app.js'))
        /*.pipe(stripDebug())*/
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/dist/js'));
});

// 이미지 압축
gulp.task('images', function() {
    return gulp.src('public/src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('public/dist/img'));
});

// html 파일
gulp.task('index-min', function(){
    return gulp.src(['public/src/index.html', 'public/src/html/**'])
        .pipe(minifyHTML())
        .pipe(gulp.dest('public/dist/html'))
});

// Clean
gulp.task('clean', function(cb) {
    del(['public/dist/css', 'public/dist/js', 'public/dist/img', 'public/dist/html'], cb)
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'index-min');
});

// Watch
gulp.task('watch', function() {
    // Watch .scss files
    gulp.watch('public/src/css/*.css', ['styles']);

    // Watch .js files
    gulp.watch(['public/src/js/**/*.js'], ['scripts']);

    // Watch image files
    gulp.watch('public/src/img/**/**/*', ['images']);

    // Watch index files
    gulp.watch(['public/src/index.html', 'public/src/html/**/*'], ['index-min']);

});
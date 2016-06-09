/**
 * Created by 동준 on 2015-05-03.
 */
const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    clean = require('gulp-clean'),
    minifyHTML = require('gulp-minify-html'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

// Styles
gulp.task('styles', function() {
    return gulp.src([
        'public/src/css/*.css'
    ])
        .pipe(concatCss('app.css'))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
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
        .pipe(cache(imagemin({progressive: true, svgoPlugins: [{removeViewBox: false},{cleanupIDs: false}],use: [pngquant()]})))
        .pipe(gulp.dest('public/dist/img'));
});

// html 파일
gulp.task('index-min', function(){
    return gulp.src(['public/src/index.html', 'public/src/html/**'])
        .pipe(minifyHTML({conditionals: true}))
        .pipe(gulp.dest('public/dist/html'))
});

// Clean
gulp.task('clean', function() {
    return gulp.src(['public/dist', 'public/imgs'], {read: false})
        .pipe(clean());
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
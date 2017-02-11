/*!
 * gulp
 * $ npm install gulp-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache --save-dev
 */
// Load plugins
var gulp = require('gulp'),
sass = require('gulp-sass-china'),
autoprefixer = require('gulp-autoprefixer'),
minifycss = require('gulp-minify-css'),
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
notify = require('gulp-notify'),
cache = require('gulp-cache'),
livereload = require('gulp-livereload'),
spritesmith=require('gulp-spritesmith'),
browserSync=require('browser-sync').create();
// Styles
gulp.task('styles', function() {
  return gulp.src('css/*.css')//要压缩的文件类型和目录地址
  .pipe(sass())//编译sass
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(gulp.dest('css'))//要压缩的文件存放位置
  .pipe(rename({ suffix: '.min' }))//给压缩后的文件添加.min后缀
  .pipe(minifycss())//压缩
  .pipe(gulp.dest('assets/css'))//压缩后的文件存放地址
  .pipe(notify({ message: 'Styles task complete' }));
});
// Scripts
gulp.task('scripts', function() {
  return gulp.src('scripts/*.js')//要压缩的文件类型和目录地址
  .pipe(jshint())//编译js
  .pipe(jshint.reporter('default'))
  .pipe(concat('all.js'))//代码合并为all.js
  .pipe(rename({ suffix: '.min' }))//给合并后的文件加后缀
  .pipe(uglify())//压缩
  .pipe(gulp.dest('assets/scripts'))//压缩后的文件存放地址
  .pipe(notify({ message: 'Scripts task complete' }));
});
// Images
gulp.task('images', function() {
  return gulp.src('images/*')//定位要压缩的图片
  .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
  .pipe(gulp.dest('assets/images'))//压缩后的图片存放地址
  .pipe(notify({ message: 'Images task complete' }));
});
//gulp-spritesmith压缩雪碧图
gulp.task('sprite',function(){
  return gulp.src('sprites/*')
  .pipe(spritesmith())
  .on('error',function(err){
    console.log(err)
  })
  .pipe(gulp.dest('assets/sprites'))
  .pipe(notify({ message: 'sprites task complete' }));
})
// Default task
gulp.task('default', function() {
  gulp.start('styles', 'scripts', 'images');
  //重载监听文件
  var files=[
    'htmls/*.html',
    'css/*.css',
    'scripts/*.js',
    'images/*',
    'sprites/*'
  ]
  //浏览器同步
  browserSync.init(files,{
    server:{
      baseDir:'./',
      directory:true
    },
    open:'external',
    startPath:'htmls/'
  })
});
// Watch
gulp.task('watch', function() {
  // Watch .html files
  gulp.watch('htmls/*.html', ['htmls']);
  // Watch sprites files
  gulp.watch("src/sprite/**/*.png", ['sprite']);
  // Watch .scss files
  gulp.watch('css/*.css', ['styles']);
  // Watch .js files
  gulp.watch('scripts/*.js', ['scripts']);
  // Watch image files
  gulp.watch('images/*', ['images']);
  // Create LiveReload server
  livereload.listen();
  // Watch any files in assets/, reload on change
  gulp.watch(['assets/*']).on('change', livereload.changed);
});


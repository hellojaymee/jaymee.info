var gulp         = require('gulp'),
		util         = require('gulp-util'),
		browserSync  = require('browser-sync'),
		jshint       = require('gulp-jshint'),
		rename       = require('gulp-rename'),
		sass         = require('gulp-ruby-sass'),
		uglify       = require('gulp-uglify'),
		fileinclude  = require('gulp-file-include'),
		notify       = require('gulp-notify'),
		autoprefixer = require('gulp-autoprefixer'),
		include      = require('gulp-include');

//subcompile
var fs     = require('fs'),
		path   = require('path'),
    concat = require('gulp-concat'),
    es     = require('event-stream');


////////////////////////////////////////////////////////////////////////////////
// sass
////////////////////////////////////////////////////////////////////////////////

gulp.task('sass', function() {
  return sass('./build/scss/stylesheet.scss', { style: 'compact' })
  .on('error', function (err) { console.log(err.message); })
  .pipe(autoprefixer({
    browsers: ['> 5%', 'last 2 versions', 'Firefox >= 30', 'Opera >= 12', 'Safari >= 5', 'Explorer >= 9'],
    }))
  .pipe(gulp.dest('./html/assets/css'))
  .pipe(browserSync.reload({stream:true}));
  });

////////////////////////////////////////////////////////////////////////////////
// html
////////////////////////////////////////////////////////////////////////////////
gulp.task('html', function() {
  return gulp.src(['./build/html/**/*.html', '!./build/html/**/_*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './build/html'
    }))
		.on('error', function (err) { console.log(err.message); })
    .pipe(gulp.dest('./'))
	  .pipe(browserSync.stream({}))
		.pipe(notify({ message: "html file: <%= file.relative %>"}));
});


////////////////////////////////////////////////////////////////////////////////
// js
////////////////////////////////////////////////////////////////////////////////
gulp.task('js', function(){

	var lint = gulp.src(['./html/assets/js/site.js', './html/assets/js/components/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'));

	var js = gulp.src(['./html/assets/js/site.js'])
		.on('error', function (err) { console.log(err.message); })
		.pipe(include())
		.pipe(rename({suffix: '.inc'}))
		.pipe(gulp.dest('./html/assets/js'))
		.pipe(uglify())
		.pipe(rename({basename: 'site.min'},{suffix: ''}))
		.pipe(gulp.dest('./html/assets/js'))
		.pipe(notify({ message: "js file: <%= file.relative %>"}));

	return lint,js;

});


////////////////////////////////////////////////////////////////////////////////
// production task
////////////////////////////////////////////////////////////////////////////////
gulp.task('prod', ['sass','html','js'],function(){});


////////////////////////////////////////////////////////////////////////////////
// browser sync
////////////////////////////////////////////////////////////////////////////////
gulp.task('browser-sync', function() {
	browserSync.init({
		open: false,
		notify: false,
		server: {
			baseDir: "./",
			index: "build/homepage.html",
			directory: true
		}
	});
});

// gulp.task('browser-sync', function() {
//     browserSync({
//         proxy: "localhost:8888",
//         open: false,
//         notify: false,
//     });
// });

////////////////////////////////////////////////////////////////////////////////
// default gulp
////////////////////////////////////////////////////////////////////////////////
gulp.task('default', ['browser-sync'], function() {
	gulp.watch('build/scss/**/*.scss', ['sass']);
	gulp.watch('build/**/*.html', ['html']);
	gulp.watch('./*.html', browserSync.reload);
	gulp.watch('./html/assets/js/**/*.js', ['js'], browserSync.reload);
});

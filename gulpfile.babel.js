var gulp = require('gulp');
var webserver = require('gulp-webserver');
var stylus = require('gulp-stylus');
var nib = require('nib');
var babelify = require('babelify');
var cleanCSS = require('gulp-clean-css');
var browserify = require('browserify');
var source= require('vinyl-source-stream');
var buffer= require('vinyl-buffer');
var uglify = require('gulp-uglify');
var smoosher= require('gulp-smoosher');
var imageop= require('gulp-imagemin');

var config = {
	styles: {
		main: './src/styles/main.styl',
		watch: ['./src/styles/**/*.styl', './src/styles/**/*.css', './src/styles/*.styl'],
		output: './build/web/css'
	},
	html: {
		watch: ['./build/web/*.html', './build/web/**/**.html']
	},
	scripts: {
	  	main: ['./src/scripts/index.js', './src/scripts/generalLook.js',
	  	 './src/scripts/einladung.js', './src/scripts/nickValidation.js',
	  	 './src/scripts/mailValidation.js', './src/scripts/autModels.js', 
	  	 './src/scripts/login.js', './src/scripts/catalogBrands.js',
	  	 './src/scripts/passModalDis.js', './src/scripts/profile.js', 
	  	 './src/scripts/carVersions.js', './src/scripts/specVersion.js',
	  	 './src/scripts/editProfile.js'],
	  	watch:'./src/scripts/**/*.js',
	  	output:'./build/web/js'
	},
	scriptsBL: {
	  	main: ['./src/scriptsBL/befLoad.js'],
	  	watch:'./src/scriptsBL/**/*.js',
	  	output:'./build/web/js'
	},
    images:{
	  	watch:['./build/web/img/*.png', './build/web/img/*.jpg', './build/web/img/*.jpeg'],
	  	output: './dist/img'
    }
}

/*gulp.task('server', function() {
  gulp.src('./build')
    .pipe(webserver({
      host: '127.0.0.1',
      port: 8008,
      livereload: true
    }));
});*/

gulp.task('images', function(){
	gulp.src(config.images.watch)
	.pipe(imageop())
	.pipe(gulp.dest(config.images.output));
});

gulp.task('build:css', function() {
  gulp.src(config.styles.main)
    .pipe(stylus({
      use: nib(),
      'include css': true
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.styles.output));
});

gulp.task('inline', function(){
	gulp.src('./build/web/index.html')
	.pipe(smoosher())
	.pipe(gulp.dest('./dist'));
});

gulp.task('build:js', function(){
	return browserify(config.scripts.main).transform(babelify)
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(buffer())
	.pipe(uglify())
	.pipe(gulp.dest(config.scripts.output));
});

gulp.task('buildBL:js', function(){
	return browserify(config.scriptsBL.main).transform(babelify)
	.bundle()
	.pipe(source('sbl.js'))
	.pipe(buffer())
	.pipe(uglify())
	.pipe(gulp.dest(config.scriptsBL.output));
});

gulp.task('watch', function() {
  gulp.watch(config.images.watch, ['images']);
  gulp.watch(config.styles.watch, ['build:css']);
  gulp.watch(config.html.watch, ['build']);
  gulp.watch(config.scripts.watch, ['build:js']);
  gulp.watch(config.scriptsBL.watch, ['buildBL:js']);
});

gulp.task('build', ['build:css', 'build:js', 'buildBL:js', 'images','inline']);

gulp.task('default', ['watch', 'build']);


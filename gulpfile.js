var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var map = require('map-stream');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sh = require('shelljs');

var paths = {
    sass: ['./scss/**/*.scss'],
    customjs: [
        './www/js/*.js',
        './www/js/**/*.js'
    ],
    templates: [
        './app/templates/*.html'
    ],
    lint: [
        './app/js/*.js'
    ]
};

gulp.task('default', ['lint', 'install', 'sass']);

gulp.task('sass', function(done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
});

/**
 * Gulp task for JavaScript code lint check
 */
gulp.task('jshint', function() {
    // forces failed build, see issue: https://github.com/sindresorhus/jshint-stylish/issues/6
    var exitOnJshintError = map(function(file) {
        if (!file.jshint.success) {
            console.error('jshint failed');
            process.exit(1);
        }
    });

    return gulp.src(paths.lint)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(exitOnJshintError);
});

/**
 * Gulp task for JavaScript Code Style check
 */
gulp.task('jscs', function() {
    return gulp.src(paths.lint)
        .pipe(jscs())
        .pipe(jscs.reporter())
        .pipe(jscs.reporter('fail'))
        .pipe(gulp.dest('jscserrors')); // needed for force exit on fail
});

gulp.task('lint', ['jshint', 'jscs']);

gulp.task('minifyhtml', function() {
    return gulp.src([
            paths.templates,
            paths.html
        ])
        .pipe(ngHtml2Js({
            moduleName: 'app',
            prefix: 'templates/'
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('www'));
});





gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});

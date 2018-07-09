var gulp = require('gulp');

var server = require('gulp-webserver');

var htmlMin = require('gulp-htmlmin');

var uglify = require('gulp-uglify');

var css = require('gulp-clean-css');

var path = require('path');

var url = require('url');

var fs = require('fs');

// var data = require('./data/data.json');

//起服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: '8080',
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                pathname = pathname === '/' ? 'index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
            }
        }))
});
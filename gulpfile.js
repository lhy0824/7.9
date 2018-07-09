var gulp = require('gulp');

var server = require('gulp-webserver');

var htmlMin = require('gulp-htmlmin');

var uglify = require('gulp-uglify');

var css = require('gulp-clean-css');

var path = require('path');

var url = require('url');

var fs = require('fs');

var data = require('./data/data.json');

var es6 = require('gulp-babel');

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
                if (pathname === '/api/list') {
                    res.end(JSON.stringify({ code: 1, msg: data }));
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
});
//压缩css
gulp.task('cleanCss', function() {
    gulp.src('./src/css/*.css')
        .pipe(css())
        .pipe(gulp.dest('./build/css'))
});

//压缩js
gulp.task('Js', function() {
    gulp.src(['./src/js/*.js', '!./js/builJs/*.min.js'])
        .pipe(es6({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'))
});
var options = {
    removeComments: true, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
    collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
    minifyJS: true, //压缩页面JS
    minifyCSS: true //压缩页面CSS
};
//压缩html
gulp.task('cssmin', function() {
    gulp.src('./src/html/**/*.html')
        .pipe(htmlMin(options))
        .pipe(gulp.dest('./build/html'))
});

//整合
gulp.task('dev', ['cssmin', 'Js', 'server', 'cleanCss'])
let gulp = require('gulp');

let cssMin = require('gulp-cssmin');
let babel = require('gulp-babel');
let uglify = require('gulp-uglify');
let htmlMin = require('gulp-htmlmin');
let gulpclean = require('gulp-clean');
let webServer = require('gulp-webserver');

// 创建一个压缩的任务
function css() {
    return gulp.src('css/**')
        .pipe(cssMin())
        .pipe(gulp.dest('dist/css'))
}

// 创建压缩js的任务
function js() {
    return gulp.src('js/**')
        .pipe(babel({
            presets: ["env"]
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
}

// 创建一个压缩HTML的任务
function html() {
    return gulp.src('html/**')
        .pipe(htmlMin({
            collapseWhitespace: true, // 表示去除空格
            removeEmptyAttributes: true, // 移出空的属性
            minifyCSS: true, // 压缩 style 标签
            minifyJS: true, // 压缩 script 标签
        }))
        .pipe(gulp.dest('dist/html'));
}



// 创建一个清楚缓存的任务
function clean() {
    return gulp.src(['dist'])
        .pipe(gulpclean());
}

function server() {
    return gulp.src('dist')
        .pipe(webServer({
            host: 'localhost', // 域名
            port: 3000, // 监听的端口号，统一写 3000
            open: 'index.html', // 打开的页面，相对于 dist 文件夹来的目录
            livereload: true, // 浏览器自动刷新
        }))
}

exports.css = css;
exports.js = js;
exports.html = html;
exports.clean = clean;
exports.server = server;

function watch() {
    gulp.watch('css', css);
    gulp.watch('js', js)
    gulp.watch('html', html);
}

// 创建一个任务执行多个任务
exports.build = gulp.series(clean, gulp.parallel(css, js, html), server, watch);
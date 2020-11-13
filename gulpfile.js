const {src, dest, watch} = require('gulp');
const gulpPlugins = require('gulp-load-plugins');
const $ = gulpPlugins();

const pkg = require('./package.json');
const conf = pkg['gulp-config'];
const sizes = conf.sizes;
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const server = browserSync.create();

function copyFiles() {
    return src('./src/**/*.html')
    .pipe(dest('./dist'));
}

function icon(done) {
    for (let size of sizes) {
        let width = size[0];
        let height = size[1];
        src('./favicon.png')
        .pipe($.imageResize({
            width,
            height,
            crop: true,
            upscale: false
        }))
        .pipe($.imagemin())
        .pipe($.rename(`favicon-${width}×${height}.png`))
        .pipe(dest('./dist/images/icon'));
    }
    done();
}

function styles() {
    return src('./src/sass/main.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .pipe($.postcss([
        autoprefixer()
    ]))
    .pipe($.sourcemaps.write('.'))
    .pipe(dest('./dist/css'));
}

function startAppServer() {
    server.init({
        server: {
            baseDir: './dist'
        }
    });
    watch('./src/**/*.scss', styles);
    watch('./src/**/*.scss').on('change', server.reload);
}

exports.copyFiles = copyFiles;
exports.icon = icon;
exports.styles = styles;
exports.serve = startAppServer;
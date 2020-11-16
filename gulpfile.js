const {src, dest, watch, series, parallel} = require('gulp');
const gulpPlugins = require('gulp-load-plugins');
const $ = gulpPlugins();

const pkg = require('./package.json');
const conf = pkg['gulp-config'];
const sizes = conf.sizes;
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const server = browserSync.create();
const isProd = process.env.NODE_ENV === "preduction";

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
    .pipe($.if(!isProd, $.sourcemaps.init()))
    .pipe($.sass())
    .pipe($.postcss([
        autoprefixer({
            cascade: false
        })
    ]))
    .pipe($.if(!isProd, $.sourcemaps.write('.')))
    .pipe(dest('./dist/css'));
}

function scripts() {
    return src('./src/js/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(dest('./dist/js'));
}

function lint() {
    return src('./src/js/*.js')
    .pipe($.eslint({fix: true}))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError())
    .pipe(dest('./src/js'))
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

// const serve = series(parallel(styles, series(lint, scripts)), startAppServer);

exports.copyFiles = copyFiles;
exports.icon = icon;
exports.styles = styles;
exports.scripts = scripts;
exports.lint = lint;
exports.serve = series(startAppServer);
const {src, dest} = require('gulp');
const gulpPlugins = require('gulp-load-plugins');
const $ = gulpPlugins();

const pkg = require('./package.json');
const conf = pkg['gulp-config'];
const sizes = conf.sizes;

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

exports.icon = icon;
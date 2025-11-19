const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const fileInclude = require('gulp-file-include');

// --- Bootstrap таски ---
const bootstrapCSS = () => {
    return src('node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(dest('dist/css'));
}

const bootstrapJS = () => {
    return src('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
        .pipe(dest('dist/js'));
}

// --- HTML таска (об’єднання всіх сторінок та компонентів) ---
const html_task = () => {
    return src('app/*.html')
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
};

// --- SCSS таска ---
const scss_task = () => {
    return src([
        'app/scss/**/*.scss'
    ])
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.min.css'))
        .pipe(cssnano())
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
};

// --- JS таска (усі JS з компонентів) ---
const js_task = () => {
    return src('app/js/**/*.js')
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream());
};

// --- Images таска ---
const img_task = () => {
    return src('app/img/**/*.{webp,png,jpg,jpeg,svg}', { encoding: false })
        .pipe(imagemin())
        .pipe(dest('dist/img'))
        .pipe(browserSync.stream());
};

const json_task = () => {
    return src('app/json/data.json')
        .pipe(dest('dist/json'))
        .pipe(browserSync.stream());
}

// --- BrowserSync та Watch ---
const serve = () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });

    watch('app/**/*.html', html_task);
    watch('app/**/*.scss', scss_task);
    watch('app/js/**/*.js', js_task);
    watch('app/img/**/*', img_task);
    watch('app/json/*.json', json_task);
};

// --- Default таска ---
exports.default = series(
    parallel(html_task, scss_task, js_task, img_task,json_task, bootstrapCSS, bootstrapJS),
    serve
);
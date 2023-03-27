const { src, dest, watch, parallel, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const clean = require("gulp-clean");

function html() {
  return src('app/**/*.html')
  .pipe(dest('dist/'))
}
function styles() {
  return src("app/scss/**/*.scss")
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 4 version"],
      })
    )
    .pipe(concat("style.min.css"))
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}
function scripts() {
  return src([
    // подключение дополнительных js файлов слайдеро и тд.
    'app/js/main.js',
  ])
    .pipe(concat("main.min.js"))
    .pipe(uglify(/* options */))
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}
function img() {
  return src('app/img/**/*.{png,jpg,webp,svg}')
  .pipe(dest('dist/img'))
}
function fonts() {
  return src('app/fonts/**/*.{eot,ttf,woff,woff2}')
  .pipe(dest('dist/fonts'))
}
function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
  });
}

function cleanDist() {
  return src("dist").pipe(clean());
}

function watching() {
  watch(["app/*.html"]).on("change", browserSync.reload);
  watch(["app/scss/style.scss"], styles);
  watch(["app/js/main.js"], scripts);
}

function build() {
  return src([
    'app/css/style.min.css',
    'app/js/main.min.js',
    'app/**/*.html',
    'app/fonts/**/*',
    'app/img/**/*',
  ],{base: 'app'})
  .pipe(dest('dist'))
}

exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.img = img;
exports.fonts = fonts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.cleanDist = cleanDist;
exports.build = build;

exports.clear = series(cleanDist);
exports.default = parallel(html,styles, scripts, img,fonts, browsersync, watching);

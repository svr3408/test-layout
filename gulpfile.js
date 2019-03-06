const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync").create();
const cssnano = require("cssnano");
const del = require("del");
const fileinclude = require("gulp-file-include");
const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const postcss = require("gulp-postcss");
const postcssImport = require("postcss-import");
const postcssNormalize = require("postcss-normalize");

gulp.task("browser-sync", function() {
  browserSync.init({
    server: {
      baseDir: "./dest"
    }
  });

  gulp.watch("./dest/*.*").on("change", browserSync.reload);
});

gulp.task("html", function() {
  return gulp
    .src("./src/index.html")
    .pipe(fileinclude())
    .pipe(gulp.dest("./dest"));
});

gulp.task("css", function() {
  return gulp
    .src("./src/style.css")
    .pipe(
      postcss([postcssImport(), postcssNormalize(), autoprefixer(), cssnano()])
    )
    .pipe(gulp.dest("./dest"));
});

gulp.task("images", function() {
  return gulp
    .src("./src/images/*.*")
    .pipe(imagemin())
    .pipe(gulp.dest("./dest/images"));
});

gulp.task("js", function() {
  return gulp.src("./src/*.js").pipe(gulp.dest("./dest"));
});

gulp.task("watch", () => {
  gulp.watch("./src/**/*.html", gulp.parallel("html"));
  gulp.watch("./src/**/*.css", gulp.parallel("css"));
  gulp.watch("./src/*.js", gulp.parallel("js"));
  gulp.watch("./src/images/*.*", gulp.parallel("images"));
});

gulp.task("clean", () => {
  return del("./dest/**/*", { force: true });
});

gulp.task(
  "default",
  gulp.series(
    "clean",
    gulp.parallel("css", "js", "html", "images"),
    gulp.parallel("browser-sync", "watch")
  )
);

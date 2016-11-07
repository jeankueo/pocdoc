"use strict";

const gulp = require('gulp');
const runSequence = require('run-sequence');
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const less = require('gulp-less');
const rename = require('gulp-rename');
const copy = require('gulp-copy');

const config = {
	clean: ["dist"],
	react: {
        sources: "bower_components/jenkins-design-language/src/js/components/**/*.{js,jsx}",
        dest: "dist/bo/js",
        babel: {
            presets: ['es2015', 'react', 'stage-0'],
            plugins: ['transform-es2015-modules-amd']
        }
    },
    less: {
        sources: "bower_components/jenkins-design-language/less/theme.less",
        watch: "less/**/*.less", // Watch includes as well as main
        dest: "dist/bo/assets/css"
    },
     copy: {
        icons: {
            sources: "bower_components/jenkins-design-language/icons/**/*",
            dest: "dist/bo/assets/icons"
        }
    }
};

gulp.task('default', ()=>{
	runSequence("clean", "build");
});

gulp.task("clean", () => 
    gulp.src(config.clean, {read: false})
        .pipe(clean()));

gulp.task("build", ["compile-react", "less", "copy"]);

gulp.task("compile-react", () =>
    gulp.src(config.react.sources)
        .pipe(sourcemaps.init())
        .pipe(babel(config.react.babel))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(config.react.dest)));

gulp.task("less", () =>
    gulp.src(config.less.sources)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(rename("jenkins-design-language.css"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(config.less.dest)));

gulp.task("copy", ["copy-icons"/*, "copy-octicons", "copy-normalize", "copy-fontsCSS", "copy-fonts",
    "copy-componentDocFiles", "copy-licenses-octicons", "copy-licenses-ofl"*/]);

gulp.task("copy-icons", () =>
    gulp.src(config.copy.icons.sources)
        .pipe(copy(config.copy.icons.dest, {prefix: 3})));
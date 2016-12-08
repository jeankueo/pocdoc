var gulp = require('gulp');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var less = require('gulp-less');
var rename = require('gulp-rename');
var copy = require('gulp-copy');

var config = {
	clean: ["web/dist"],
	react: {
		sources: "bower_components/jenkins-design-language/src/js/components/**/*.{js,jsx}",
		dest: "web/dist/bo/js",
		babel: {
			presets: ['es2015', 'react', 'stage-0'],
			plugins: ['transform-es2015-modules-amd']
		}
	},
	less: {
		sources: "web/src/less/jenkinsbo.less",
		watch: "less/**/*.less", // Watch includes as well as main
		dest: "web/dist/bo/assets/css"
	},
	copy: {
		icons: {
			sources: "bower_components/jenkins-design-language/icons/**/*",
			dest: "web/dist/bo/assets/icons"
		},
		oct: {
			sources: "node_modules/octicons/build/font/*.{ttf,eot}",
			dest: "web/dist/oct"
		},
		fontawesome: {
			sources: "node_modules/font-awesome/fonts/*.{ttf,eot}",
			dest: "web/dist/fontawesome"
		},
		polyfill: {
			sources: "node_modules/babel-polyfill/dist/polyfill.min.js",
			dest: "web/dist/polyfill"
		}
	}
};

gulp.task('default', function () {
	runSequence("clean", "build");
});

gulp.task("clean", function () {
	gulp.src(config.clean, {read: false})
		.pipe(clean());
});

gulp.task("build", ["compile-react", "less", "copy"]);

gulp.task("compile-react", function () {
	gulp.src(config.react.sources)
		.pipe(sourcemaps.init())
		.pipe(babel(config.react.babel))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(config.react.dest));
});

gulp.task("less", function () {
	gulp.src(config.less.sources)
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(rename("jenkins-design-language.css"))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(config.less.dest));
});

gulp.task("copy", ["copy-icons", "copy-oct", "copy-fontawesome", "copy-polyfill"]);

gulp.task("copy-icons", function () {
	gulp.src(config.copy.icons.sources)
		.pipe(copy(config.copy.icons.dest, {prefix: 3}));
});

gulp.task("copy-icons-replace-space", function () {
	gulp.src(config.copy.icons.sources)
		.pipe(rename(function (path) {
			path.basename = path.basename.replace(' ', '%20');
			console.log(path.basename);
		}))
		.pipe(gulp.dest(config.copy.icons.dest));
});

gulp.task("copy-oct", function () {
	gulp.src(config.copy.oct.sources)
		.pipe(copy(config.copy.oct.dest, {prefix: 4}));
});

gulp.task("copy-fontawesome", function () {
	gulp.src(config.copy.fontawesome.sources)
		.pipe(copy(config.copy.fontawesome.dest, {prefix: 3}));
});

gulp.task("copy-polyfill", function () {
	gulp.src(config.copy.polyfill.sources)
		.pipe(copy(config.copy.polyfill.dest, {prefix: 3}));
});
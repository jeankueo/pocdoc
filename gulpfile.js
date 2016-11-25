var gulp = require('gulp');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var less = require('gulp-less');
var rename = require('gulp-rename');
var copy = require('gulp-copy');

var config = {
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
		sources: "src/less/jenkinsbo.less",
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

gulp.task("copy", ["copy-icons"/*"copy-icons-replace-space"*//*, "copy-octicons", "copy-normalize", "copy-fontsCSS", "copy-fonts",
	"copy-componentDocFiles", "copy-licenses-octicons", "copy-licenses-ofl"*/]);

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

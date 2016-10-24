var path = require('path');

module.exports = {
	entry: path.resolve(__dirname, './src/index.js'),
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /src\/.+.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel'
		}]
	}
}
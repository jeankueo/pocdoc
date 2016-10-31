var path = require('path');

module.exports = {
	entry: path.resolve(__dirname, '../src/es6pre/index.js'),
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'es6_preprocess.js'
	},
	module: {
		loaders: [{
			test: /src\/.+.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel',
			query: {
				presets: ['react', 'es2015', 'stage-0']
			}
		}, {
			test: /.jsx?$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				presets: ['es2015', 'react', 'stage-0']
			}
		}, { 
			test: /\.css$/, 
			loader: "style-loader!css-loader" 
		}, { 
			test: /\.png$/, 
			loader: "url-loader?limit=100000" 
		}, { 
			test: /\.jpg$/, 
			loader: "file-loader" 
		}, {
			test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
			loader: 'url?limit=10000&mimetype=application/font-woff'
		}, {
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
			loader: 'url?limit=10000&mimetype=application/octet-stream'
		}, {
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
			loader: 'file'
		}, {
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
			loader: 'url?limit=10000&mimetype=image/svg+xml'//'svg-url-loader'
		}]
	}
}
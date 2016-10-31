var path = require('path');

module.exports = {
	//entry: path.resolve(__dirname, '../src/es5/controls.js'),
	entry: path.resolve(__dirname, '../bower_components/jenkins-design-language/src/js/components/weather-icon.jsx'),
	//entry: path.resolve(__dirname, '../src/es5/Test.jsx'),
	output: {
		path: path.resolve(__dirname, '../asset'),
		//filename: 'testU.js'
		filename: 'weather-icon.js'
	},
	module: {
		loaders: [/*{
			test: /src\/.+.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel',
			query: {
				presets: ['react', 'es2015', 'stage-0'],
				plugins: ["transform-es2015-modules-amd"]
			}
		},*/ {
			test: /.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'react', 'stage-2'],
				plugins: ["transform-es2015-modules-amd"]
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
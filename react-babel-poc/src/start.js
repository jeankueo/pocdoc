requirejs.config({
	'baseUrl': '../',
	'paths': {
		'bojs': 'dist/bo/js',
		//'lib': 'lib',
		'react': 'https://unpkg.com/react@15.3.2/dist/react',
		'react-dom': 'https://unpkg.com/react-dom@15.3.2/dist/react-dom'
	}
});

requirejs([
	'react', 'react-dom', 'bojs/weather-icon', 'bojs/PipelineGraph'
], function (React, ReactDOM, weathericon, PipelineGraph) {
	
	var weatherElement = React.createElement(weathericon.WeatherIcon, {score: "70"});
	
	ReactDOM.render(
		weatherElement,
		document.getElementById('root'));
});
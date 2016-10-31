requirejs.config({
	'baseUrl': '../',
	'paths': {
		'bo': 'dist',
		'react': 'https://unpkg.com/react@15.3.2/dist/react',
		'react-dom': 'https://unpkg.com/react-dom@15.3.2/dist/react-dom'
	}
});

requirejs([
	'react', 'react-dom', 'bo/weather-icon', 'bo/PipelineGraph'
], function (React, ReactDOM, WeatherIcon, PipelineGraph) {
	ReactDOM.render(
		React.createElement('p', {}, 'Hello, AMD!'),
			document.getElementById('root'));
});
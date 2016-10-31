requirejs.config({
	'baseUrl': '../',
	'paths': {
		'bo': 'dist',
		'react': '//fb.me/react-with-addons-0.14.2'
	}
});

requirejs(['bo/weather-icon', 'bo/PipelineGraph'], function (WeatherIcon, PipelineGraph) {
	
});
requirejs.config({
	'baseUrl': '../',
	'paths': {
		'bo': 'dist',
		'react': '//fb.me/react-with-addons-0.14.2'
	}
});

requirejs(['react', 'bo/weather-icon'], function (React, WeatherIcon) {
	console.log(arguments.length)
});
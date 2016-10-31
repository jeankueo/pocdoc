requirejs.config({
	baseUrl: '../',
	paths: {
		bo: 'asset'
	}
});

requirejs(['bo/weather-icon', 'bo/testA'], function (A, B) {
	console.log(arguments.length)
});
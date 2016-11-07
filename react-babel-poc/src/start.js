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
	'react', 'react-dom', 'bojs/weather-icon', 'bojs/PipelineGraph', 'bojs/status/StatusIndicator'
], function (React, ReactDOM, weathericonExport, pipelineGraphExport, StatusIndicatorExport) {
	
	var weatherElement = React.createElement(weathericonExport.WeatherIcon, {
			key: "weather",
			score: "70"
		});
	
	// start test data
	var validResultValues = StatusIndicatorExport.StatusIndicator.validResultValues,
		__id = 1;
	
	function makeNode(name, children, state, completePercent) {
		var percent = completePercent || ((state == validResultValues.running) ? Math.floor(Math.random() * 60 + 20) : 50);
		__id++;
		return {
			name: name,
			children: children,
			state: state,
			percent: percent,
			id: __id
		};
	}
	// end test data
	
	var pipelineGraph1 = React.createElement(pipelineGraphExport.PipelineGraph, {
		key: "pg1",
		layout: {nodeSpacingH: 90},
		stages: [
			makeNode("Success", [], validResultValues.success),
			makeNode("Failure", [], validResultValues.failure),
			makeNode("Running", [], validResultValues.running),
			makeNode("Slow", [], validResultValues.running, 150),
			makeNode("Queued", [], validResultValues.queued),
			makeNode("Unstable", [], validResultValues.unstable),
			makeNode("Aborted", [], validResultValues.aborted),
			makeNode("Not Built", [], validResultValues.not_built),
			makeNode("Bad data", [], "this is not my office")
		]
	});
	
	var pipelineGraph2 = React.createElement(pipelineGraphExport.PipelineGraph, {
		key: "pg2",
		layout: {nodeSpacingH: 90},
		stages: [
			makeNode("Build", [], validResultValues.success),
			makeNode("Test", [], validResultValues.success),
			makeNode("Browser Tests", [
				makeNode("Internet Explorer", [], validResultValues.queued),
				makeNode("Chrome", [], validResultValues.queued)
			]),
			makeNode("Dev"),
			makeNode("Dev"), // Make sure it works with dupe names
			makeNode("Staging"),
			makeNode("Production")
		]
	});
	
	ReactDOM.render(
		React.createElement('div', {}, [weatherElement, pipelineGraph1,  pipelineGraph2]),
		document.getElementById('root'));
});
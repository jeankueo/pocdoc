import React, { Component } from 'react';
import {PipelineGraph, defaultLayout} from '../node_modules/@jenkins-cd/design-language/dist/js/components/PipelineGraph.js';

import {StatusIndicator} from '../node_modules/@jenkins-cd/design-language/dist/js/components/';

const validResultValues = StatusIndicator.validResultValues;
let __id = 1;

function makeNode(name, children = [], state = validResultValues.not_built, completePercent) {
	completePercent = completePercent || ((state == validResultValues.running) ? Math.floor(Math.random() * 60 + 20) : 50);
	const id = __id++;
	return {name, children, state, completePercent, id};
}

class PipelinePoC extends Component {
	render() {
		// Reduce spacing just to make this graph smaller
		const layout = { nodeSpacingH: 90 };
		
		// case 1
		const stages1 = [
			makeNode("Success", [], validResultValues.success),
			makeNode("Failure", [], validResultValues.failure),
			makeNode("Running", [], validResultValues.running),
			makeNode("Slow", [], validResultValues.running, 150),
			makeNode("Queued", [], validResultValues.queued),
			makeNode("Unstable", [], validResultValues.unstable),
			makeNode("Aborted", [], validResultValues.aborted),
			makeNode("Not Built", [], validResultValues.not_built),
			makeNode("Bad data", [], "this is not my office")
		];
		
		// case 2
		const stages2 = [
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
		];
		
		function nodeClicked(...values) {
			console.log('Node clicked', values);
		}
		
		return (<div>
			<div><PipelineGraph stages={stages1} layout={layout}/></div>
			<div><PipelineGraph stages={stages2} layout={layout} onNodeClick={nodeClicked}/></div>
		</div>);
	}
}

export default PipelinePoC;
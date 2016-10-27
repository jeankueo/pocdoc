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
		this.state = {layout: defaultLayout};
		
		const stages = [
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

		// Reduce spacing just to make this graph smaller
		const layout = { nodeSpacingH: 90 };
		
		return (
			<PipelineGraph stages={stages} layout={layout} />
		);
	}
}

export default PipelinePoC;
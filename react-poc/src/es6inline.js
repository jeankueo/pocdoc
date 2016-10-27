import {StatusIndicator} from '../node_modules/@jenkins-cd/design-language/dist/js/components/';

const validResultValues = StatusIndicator.validResultValues;
let __id = 1;

function makeNode(name, children = [], state = validResultValues.not_built, completePercent) {
	completePercent = completePercent || ((state == validResultValues.running) ? Math.floor(Math.random() * 60 + 20) : 50);
	const id = __id++;
	return {name, children, state, completePercent, id};
};


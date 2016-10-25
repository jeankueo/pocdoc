import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import {PipelinePage} from '../bower_components/blueocean-plugin/blueocean-dashboard/src/main/js/components/PipelinePage.jsx';
import PipelineRowItem from '../bower_components/blueocean-plugin/blueocean-dashboard/src/main/js/components/PipelineRowItem.jsx';

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome Jean to Webpack+babel+React World!</h2>
				</div>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>
			</div>
		);
	}
}

export default App;

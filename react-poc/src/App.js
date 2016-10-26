import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Icon, shapes } from 'react-material-icons-blue';
import { WeatherIcon } from '../node_modules/@jenkins-cd/design-language/dist/js/components/weather-icon.js';
import '../node_modules/@jenkins-cd/design-language/dist/assets/css/jenkins-design-language.css';


import PipelinePoC from './PipelinePoC.js';


class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Hello World!</h2>
				</div>
				<Icon
		          icon="link"// Icon in the field transformation
		          style={{ fill: 'green' }} // Styles prop for icon (svg)
		        />
		        <WeatherIcon score="70" />
		        <PipelinePoC />
				<div>
			        {
			            Object.keys(shapes).map((shape, index) => <div
			              key={index}
			              style={
			                  {
			                      display: 'inline',
			                      float: 'left',
			                      padding: '5px',
			                  }
			              }
			            >
			                <Icon icon={shape} />
			                <div>{shape}</div>
			            </div>)
			        }
			    </div>
			</div>
		);
	}
}

export default App;

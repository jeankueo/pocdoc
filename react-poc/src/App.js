import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Icon, shapes } from 'react-material-icons-blue';
import PipelineRowItem from '../bower_components/blueocean-plugin/blueocean-dashboard/src/main/js/components/PipelineRowItem.jsx';

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome Jean to Webpack+babel+React World!</h2>
				</div>
				<Icon
		          icon="link"// Icon in the field transformation
		          style={{ fill: 'green' }} // Styles prop for icon (svg)
		        />
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

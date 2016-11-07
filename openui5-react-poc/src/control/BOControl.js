sap.ui.define([
	"sap/ui/core/Control", "require"
], function (Control) {
	"use strict";
	
	var BOControl = Control.extend("sap.ciconnect.control.BOControl", {
		metadata: {
			properties: {
				moduleName: {type: "string"}, // amd module
				controlName: {type: "string"}, // control name on exported object
				props: {type: "any"}	// react property
			}
		}
	});
	
	BOControl.prototype.init = function () {
		requirejs.config({
			'baseUrl': '../',
			'paths': {
				'bojs': 'dist/bo/js',
				//'lib': 'lib',
				'react': 'https://unpkg.com/react@15.3.2/dist/react',
				'react-dom': 'https://unpkg.com/react-dom@15.3.2/dist/react-dom'
			}
		});
	};
	
	BOControl.prototype.onAfterRendering = function () {
		var sId = this.getId(),
			sModuleName = this.getModuleName(),
			sControlName = this.getControlName();
		
		var	oProps = jQuery.extend({}, this.getProps(), {
				key: sId + "_" + sModuleName + "_" + sControlName
			});
		
		requirejs([
			'react', 'react-dom', 'bojs/' + sModuleName
		], function (React, ReactDOM, Exporter) {
			if (Exporter[sControlName]) {
				ReactDOM.render(
					React.createElement(Exporter[sControlName], oProps),
					document.getElementById(sId));
			}
		});
	};
	
	return BOControl;
}, true);
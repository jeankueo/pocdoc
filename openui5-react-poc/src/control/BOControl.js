sap.ui.define([
	"sap/ui/core/Control", "require"
], function (Control) {
	"use strict";
	
	var BOControl = Control.extend("sap.ciconnect.control.BOControl", {
		metadata: {
			properties: {
				/**
				 * Width of root <div>
				 */
				width: {type: "sap.ui.core.CSSSize", defaultValue: undefined},
				/**
				 * Height of root <div>
				 */
				height: {type: "sap.ui.core.CSSSize", defaultValue: undefined},
				/**
				 * Module name of Jenkins-design-language control in AMD module bundle system
				 */
				moduleName: {type: "string"},
				/**
				 * Control name of Jenkins-design-language control in the module
				 */
				controlName: {type: "string"},
				/**
				 * JSON data property in control props definition
				 */
				props: {type: "any"}
			},
			events: {
				
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
			sControlName = this.getControlName(),
			that = this;
		
		var	oProps = jQuery.extend({}, this.getProps(), {
				key: sId + "_" + sModuleName + "_" + sControlName
			});
		
		requirejs([
			'react', 'react-dom', 'bojs/' + sModuleName
		], function (React, ReactDOM, Exporter) {
			if (Exporter[sControlName]) {
				ReactDOM.render(
					React.createElement(Exporter[sControlName], oProps),
					document.getElementById(sId)/*, 
					function ($ref) {
						return $ref;
					}*/
				);

				var $bo = jQuery("#" + that.getId()).children();
				that.addJenkinsboClass($bo); // add namespace of css -- quick and dirty solution
			}
		});
	};
	
	BOControl.prototype.addJenkinsboClass = function (aDomElement) {
		aDomElement.addClass("jenkinsbo");
		var aChildren = aDomElement.children();
		if (aChildren && aChildren.length > 0) {
			this.addJenkinsboClass(aChildren);
		}
	};
	
	return BOControl;
}, true);
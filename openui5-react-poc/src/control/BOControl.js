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
			aggregations: {
				contents: {type: "sap.ciconnect.control.BOElement", multiple: true, visibility: "public", singularName: "content"},
				boEvents: {type: "sap.ciconnect.control.BOEvent", multiple: true, visibility: "public", singularName: "boEvent"}
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
				key:  sModuleName + "_" + sControlName + "_" + sId
			});
		
		requirejs([
			'react', 'react-dom', 'bojs/' + sModuleName
		], function (React, ReactDOM, Exporter) {
			if (Exporter[sControlName]) {

				// register event handlers into props
				var aBoEvents = that.getBoEvents();
				if (aBoEvents && aBoEvents.length > 0) {
					for (var i = 0; i < aBoEvents.length; i++) {
						oProps[aBoEvents[i].getName()] = function () {
							this.fireHandle({
								params: arguments
							});
						}.bind(aBoEvents[i])
					}
				}

				// build composition - react controls
				var aChildren = that.getContents(),
					aReactChildren;
				if (aChildren && aChildren.length > 0) {
					aReactChildren = [];
					for (var i = 0; i < aChildren.length; i++) {
						aReactChildren.push(aChildren[i].genReactElement());
					}
				}

				// create DOM
				ReactDOM.render(
					React.createElement(
						Exporter[sControlName],
						oProps,
						aReactChildren),
					document.getElementById(sId)
				);

				// add namespace of css to avoid conflict -- quick and dirty solution
				var $bo = jQuery("#" + that.getId()).children();
				that.addJenkinsboClass($bo); 
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
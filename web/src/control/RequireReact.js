sap.ui.define(["require"], function () {
	"use strict";

	var RequireReact = {};

	RequireReact.configRequire = function () {
		requirejs.config({
			'baseUrl': '../',
			'paths': {
				'bojs': 'dist/bo/js',
				'react': 'https://unpkg.com/react@15.3.2/dist/react',
				'react-dom': 'https://unpkg.com/react-dom@15.3.2/dist/react-dom'
			}
		});
	};

	RequireReact.renderReact = function (oBOControl) {
		var sId = oBOControl.getId(),
			sModuleName = oBOControl.getModuleName(),
			sControlName = oBOControl.getControlName(),
			that = this;
		
		var	oProps = jQuery.extend({}, oBOControl.getProps(), {
				key:  sModuleName + "_" + sControlName + "_" + sId
			});
		
		requirejs([
			'react', 'react-dom', 'bojs/' + sModuleName
		], function (React, ReactDOM, Exporter) {
			if (Exporter[sControlName]) {

				// register event handlers into props
				var aBoEvents = oBOControl.getBoEvents();
				if (aBoEvents && aBoEvents.length > 0) {
					for (var i = 0; i < aBoEvents.length; i++) {
						oProps[aBoEvents[i].getName()] = function () {
							this.fireHandle({
								params: arguments
							});
						}.bind(aBoEvents[i])
					}
				}

				// render inner react controls if this is a container element
				var aChildren = oBOControl.getContents(),
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
				var $bo = jQuery("#" + oBOControl.getId()).children();
				that.addJenkinsboClass($bo); 
			}
		});
	};

	RequireReact.addJenkinsboClass = function (aDomElement) {
		aDomElement.addClass("jenkinsbo");
		var aChildren = aDomElement.children();
		if (aChildren && aChildren.length > 0) {
			this.addJenkinsboClass(aChildren);
		}
	};

	return RequireReact;
}, true)
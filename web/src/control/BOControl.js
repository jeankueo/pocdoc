sap.ui.define([
	"sap/ui/core/Control", "./RequireReact"
], function (Control, RequireReact) {
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
		RequireReact.configRequire();
	};
	
	BOControl.prototype.onAfterRendering = function () {
		RequireReact.renderReact(this, true);
	};
	
	return BOControl;
}, true);
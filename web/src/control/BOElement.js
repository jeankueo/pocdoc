sap.ui.define([
	"sap/ui/core/Element", "./RequireReact"
], function (Element, RequireReact) {
	"use strict";

	var BOElement = Element.extend("sap.ciconnect.control.BOElement", {
		metadata: {
			properties: {
				name: {type: "string", defaultValue: "children"},
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
				contents: {type: "sap.ciconnect.control.BOElement",multiple: true, visibility: "public", singularName: "content"},
				boEvents: {type: "sap.ciconnect.control.BOEvent", multiple: true, visibility: "public", singularName: "boEvent"}
			}
		
}	});

	BOElement.prototype.init = function () {
		RequireReact.configRequire();
	};

	BOElement.prototype.genReactElement = function () {
		return RequireReact.renderReact(this);
	};

	return BOElement;
}, true);
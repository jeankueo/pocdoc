sap.ui.define([
	"sap/ui/core/Element"
], function (Element) {
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
			}, aggregations: {
				children: {type: "sap.ciconnect.control.BOElement",multiple: true, visibility: "public", singularName: "child"}
			}
		}
	});

	BOElement.prototype.genReactElement = function () {
		
	};

	return BOElement;
}, true);
sap.ciconnect.control = sap.ciconnect.control || {};
sap.ciconnect.control.ContainerDisplay = {
	FloatLeft: "FloatLeft",
	FlexColumn: "FlexColumn"
};

sap.ui.define([
	"sap/ui/core/Control"
], function (Control) {
	"use strict";
	
	var Container = Control.extend("sap.ciconnect.control.Container", {
		metadata: {
			properties: {
				width: {type: "sap.ui.core.CSSSize", defaultValue: undefined},
				height: {type: "sap.ui.core.CSSSize", defaultValue: undefined},
				display: {type: "string", defaultValue: sap.ciconnect.control.ContainerDisplay.FloatLeft}
			},
			aggregations: {
				items: {type: "sap.ui.core.Control", multiple: true, visibility: "public", singularName: "item", bindable: "bindable"}
			}
		}
	});

	return Container;
}, true);
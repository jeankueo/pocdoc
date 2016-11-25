sap.ciconnect.control = sap.ciconnect.control || {};

sap.ui.define([
	"sap/ui/core/Control"
], function (Control) {
	"use strict";
	
	var SvgIcon = Control.extend("sap.ciconnect.control.SvgIcon", {
		metadata: {
			properties: {
				width: {type: "sap.ui.core.CSSSize", defaultValue: undefined}, // don't use it if you use css to control size
				height: {type: "sap.ui.core.CSSSize", defaultValue: undefined},// don't use it if you use css to control size
				name: {type: "string", defaultValue: undefined} // mandatory to provide, otherwise empty svg is rendered
			}
		}
	});

	return SvgIcon;
}, true);
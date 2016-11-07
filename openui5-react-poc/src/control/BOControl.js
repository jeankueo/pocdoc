sap.ui.define([
	"sap.ui.Control"
], function (Control) {
	"use strict";
	
	var BOControl = Control.extend("sap.ciconnect.control.BOControl", {
		metadata: {
			properties: {
				controlName: {type: "string"},
				status: {type: any}
			}
		}
	});
	
	BOControl.prototype.setControlName = function (sControlName) {
		this.setProperty("controlName", sControlName);
		this._oControlExport = jQuery.sap.require("jenkins.bo." + sControlname);
	};
	
	return BOControl;
}, true);
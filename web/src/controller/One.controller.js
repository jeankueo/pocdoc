sap.ui.define([
	"../controller/BaseController"
], function (BaseController) {
	"use strict";
	
	return BaseController.extend("sap.ciconnect.controller.One", {
		onResize: function (oEvent) {
			this.getView().invalidate(); // to trigger recalculation of scroll bars
		}
	});
});
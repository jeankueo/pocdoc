sap.ui.define([
	"../controller/BaseController"
], function (BaseController) {
	"use strict";
	
	return BaseController.extend("sap.ciconnect.controller.Home2", {
		onResize: function (oEvent) {
			this.getView().invalidate(); // to trigger recalculation of scroll bars
		}
	});
});
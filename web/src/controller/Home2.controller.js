sap.ui.define([
	"../controller/HomeBaseController"
], function (HomeBaseController) {
	"use strict";
	
	return HomeBaseController.extend("sap.ciconnect.controller.Home2", {
		onResize: function (oEvent) {
			this.getView().invalidate(); // to trigger recalculation of scroll bars
		}
	});
});
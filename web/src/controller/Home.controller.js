sap.ui.define([
	"./HomeBaseController"
], function (HomeBaseController) {
	"use strict";
	
	var _aValidTabKeys = ["Summary", "Pipelines", "Repositories"];

	return HomeBaseController.extend("sap.ciconnect.controller.Home", {

		onInit: function () {
			this.getRouter().getRoute("appHome").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function (oEvent) {
			var oArgs, oView, oQuery;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			oQuery = oArgs["?query"] || {};
			if (oQuery.tab && _aValidTabKeys.indexOf(oQuery.tab) > -1){
				oView.getModel("setting").setProperty("/selectedTabKey", oQuery.tab);
			} else {
				// the default query param should be visible at all time
				oQuery.tab =  _aValidTabKeys[0];
				this.getRouter().navTo("appHome", {query: oQuery}, true /* no history */);
			}
		},

		onTabSelect: function (oEvent) {
			this.getRouter().navTo("appHome", {
				query: {
					tab : oEvent.getParameter("selectedKey")
				}
			}, true /*without history*/);
		},

		onPipelineTokenPressed: function (oEvent) {
			this.getView().getModel("setting").setProperty("/selectedTabKey", "Pipelines");
		},

		onRepoTokenPressed: function (oEvent) {
			this.getView().getModel("setting").setProperty("/selectedTabKey", "Repositories");
		}
	});
});
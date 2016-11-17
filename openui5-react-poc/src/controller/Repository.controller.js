sap.ui.define([
	"../controller/BaseController", 'sap/ui/model/Filter', "sap/ui/model/json/JSONModel",
	"../model/formatter"
], function (BaseController, Filter, JSONModel, formatter) {
	"use strict";

	return BaseController.extend("sap.ciconnect.controller.Repository", {
		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("repository").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function (oEvent) {
			var oArgs = oEvent.getParameter("arguments"),
				oView = this.getView();

			oView.bindElement({
				path: "repo>/" + oArgs.index,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function (oEvent) {
						oView.setBusy(true);
					},
					dataReceived: function (oEvent) {
						oView.setBusy(false);
					}
				}
			})
		},
		
		_onBindingChange: function (oEvent) {
			if (!this.getView().getBindingContext("repo")) {
				this.getRouter().getTargets().display("notFound");
			}
		}
	});
});
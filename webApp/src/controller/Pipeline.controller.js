sap.ui.define([
	"../controller/BaseController", 'sap/ui/model/Filter', "sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"../model/formatter"
], function (BaseController, Filter, JSONModel, MessageToast, formatter) {
	"use strict";

	return BaseController.extend("sap.ciconnect.controller.Pipeline", {
		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("pipeline").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function (oEvent) {
			var oArgs = oEvent.getParameter("arguments"),
				oView = this.getView();

			oView.bindElement({
				path: "pipeline>/" + oArgs.index,
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
			// TODO: applicable to odata, json model does not work well
			if (!this.getView().getBindingContext("pipeline")) {
				this.getRouter().getTargets().display("notFound");
			}
		},

		onPipelineNodeClick: function (oEvent) {
			var oParam = oEvent.getParameter("params");
			MessageToast.show("node " + oParam[0] + " clicked!");
		}
	});
});
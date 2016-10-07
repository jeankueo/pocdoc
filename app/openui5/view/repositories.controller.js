sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"], function (Controller, JSONModel) {
	"use strict";
	
	return Controller.extend("sap.ciconnect.view.repositories", {
		onInit: function() {
			var oModel = new JSONModel();
			oModel.loadData("../data/repo.json");
			this.getView().setModel(oModel, "github");
		},
		
		handlePress: function (oEvent) {
			alert(JSON.stringify(oEvent.getParameters()));
		},
		
		handleDetailPress: function (oEvent) {
			alert(JSON.stringify(oEvent.getParameters()));
		}
	});
});
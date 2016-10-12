sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"], function (Controller, JSONModel) {
	"use strict";
	
	return Controller.extend("sap.ciconnect.view.repositories", {
		onInit: function() {
			var oModel = new JSONModel();
			oModel.loadData("../data/githubrepo.json");
			this.getView().setModel(oModel, "github");
			
			oModel = new JSONModel();
			oModel.loadData("../data/gitrepo.json");
			this.getView().setModel(oModel, "git");
		},
		
		onAfterRendering: function () {
			var iGitHubLength = this.getView().getModel("github").getData().length,
				iGitLength = this.getView().getModel("git").getData().length;
			this.getView().getParent().setCount(iGitHubLength + iGitLength);
		},
		
		handlePress: function (oEvent) {
			alert(JSON.stringify(oEvent.getParameters()));
		},
		
		handleDetailPress: function (oEvent) {
			alert(JSON.stringify(oEvent.getParameters()));
		}
	});
});
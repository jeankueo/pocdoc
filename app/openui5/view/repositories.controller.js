sap.ui.define([
	"sap/ui/core/mvc/Controller", 'sap/ui/model/Filter', "sap/ui/model/json/JSONModel"
], function (Controller, Filter, JSONModel) {
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
		
		onSearch: function (oEvent) {
			// add filter for search
			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var ofilter = new Filter("full_name", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(ofilter);
			}
 
			// update github list binding
			var oList = this.getView().byId("githubList");
			var obinding = oList.getBinding("items");
			obinding.filter(aFilters);
			
			// update git list binding
			oList = this.getView().byId("gitList");
			obinding = oList.getBinding("items");
			obinding.filter(aFilters);
		}
	});
});
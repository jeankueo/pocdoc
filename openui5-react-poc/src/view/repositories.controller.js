sap.ui.define([
	"sap/ui/core/mvc/Controller", 'sap/ui/model/Filter', "sap/ui/model/json/JSONModel"
], function (Controller, Filter, JSONModel) {
	"use strict";
	
	return Controller.extend("sap.ciconnect.view.repositories", {
		onInit: function() {
			this._iSelectCount = 0;
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
		},

		onSelectionChange: function (oEvent) {
			this._updateRepoToken();
		},

		_updateRepoToken: function () {
			var oGitList = this.getView().byId("gitList"),
				oGithubList = this.getView().byId("githubList"),
				oModel = this.getView().getModel("setting");

			var aGitSelectedContexts = oGitList.getSelectedContexts(true),
				aGithubSelectedContexts = oGithubList.getSelectedContexts(true);

			var iSelectedCount = aGitSelectedContexts.length + aGithubSelectedContexts.length;
			if (iSelectedCount > 0) {
				oModel.setProperty("/repoTokenVisible", true);
				oModel.setProperty("/repoTokenNumber",  iSelectedCount);
			} else {
				oModel.setProperty("/repoTokenVisible", false);
			}
			oModel.updateBindings(true);
		},

		removeAllSelection: function () {
			var oGitList = this.getView().byId("gitList");
			oGitList.removeSelections(true);

			var oGithubList = this.getView().byId("githubList");
			oGithubList.removeSelections(true);
		}
	});
});
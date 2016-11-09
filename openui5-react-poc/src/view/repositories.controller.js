sap.ui.define([
	"sap/ui/core/mvc/Controller", 'sap/ui/model/Filter', "sap/ui/model/json/JSONModel"
], function (Controller, Filter, JSONModel) {
	"use strict";
	
	return Controller.extend("sap.ciconnect.view.repositories", {
		onInit: function() {
			this._iSelectCount = 0;
			this._initData();
		},

		_initData: function () {
			var oModel = new JSONModel();
			oModel.setData([{
				key: "ALL",
				text: "All",
				count: 10
			}, {
				key: "GITHUB",
				text: "Github",
				count: 8
			}, {
				key: "GITHUB-O1",
				org: "ciconnect",
				text: "Github-ciconnect",
				count: 5
			}, {
				key: "GITHUB-O2",
				org: "i037379",
				text: "Github-i037379",
				count: 3
			}, {
				key: "GIT",
				text: "Git",
				count: 2
			}]);
			this.getView().setModel(oModel, "category");
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
			var oRepoList = this.getView().byId("repoList"),
				oModel = this.getView().getModel("setting");

			var aRepoSelectedContexts = oRepoList.getSelectedContexts(true);

			var iSelectedCount = aRepoSelectedContexts.length;

			if (iSelectedCount > 0) {
				oModel.setProperty("/repoTokenVisible", true);
				oModel.setProperty("/repoTokenNumber",  iSelectedCount);
			} else {
				oModel.setProperty("/repoTokenVisible", false);
			}
			oModel.updateBindings(true);
		},

		removeAllSelection: function () {
			var oRepoList = this.getView().byId("repoList");
			oRepoList.removeSelections(true);
		}
	});
});
sap.ui.define([
	"sap/ui/core/mvc/Controller", 'sap/ui/model/Filter', "sap/ui/model/json/JSONModel"
], function (Controller, Filter, JSONModel) {
	"use strict";
	
	return Controller.extend("sap.ciconnect.view.repositories", {
		onInit: function() {
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
		
		onAddGitRepo: function (oEvent) {
			var sURL = oEvent.getSource().getValue();
			if (sURL) {
				var oModel = this.getView().getModel("git");
				var oData = oModel.getData();
				oData.push({
					"name": "new rep",
					"full_name": "new git repository " + sURL,
					"pipeline": {
						"id": "pipeline4",
						"name": "Some Team's Pipeline",
						"type": "mixed",
						"jobs": [{
							"type": "local",
							"goal": "BLD",
							"status": "None"
						}]
					},
					"private": true,
					"folked": false
				});
				oModel.setData(oData);
				oModel.updateBindings(true); // force counter in tab to update
				oEvent.getSource().setValue();
			}
		},

		onSelectionChange: function (oEvent) {
			var oList = oEvent.getSource(),
				 oToolbar = this.getView().byId("pipelineSelectInfoToolbar"),
				 oLabel = this.getView().byId("pipelineSelectInfoLabel");
			var aSelectedContexts = oList.getSelectedContexts(true);
			var bSelected = aSelectedContexts && aSelectedContexts.length > 0;
			var sText = bSelected ? aSelectedContexts.length + " selected" : null;
			oToolbar.setVisible(bSelected);
			oLabel.setText(sText);
		}
	});
});
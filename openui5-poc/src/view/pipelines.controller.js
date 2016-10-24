sap.ui.define([
	"sap/ui/core/mvc/Controller", 'sap/ui/model/Filter', "sap/ui/model/json/JSONModel",
	"../model/formatter"
], function (Controller, Filter, JSONModel, formatter) {
	"use strict";
	
	return Controller.extend("sap.ciconnect.view.pipelines", {
		formatter: formatter,

		onInit: function() {
		},
		
		onSearch: function (oEvent) {
			// add filter for search
			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var ofilter = new Filter("name", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(ofilter);
			}
 
			// update list binding
			var oList = this.getView().byId("pipelineList");
			var obinding = oList.getBinding("items");
			obinding.filter(aFilters);
		},

		onSelectionChange: function (oEvent) {
			var oList = oEvent.getSource(),
				oListItem = oEvent.getParameter('listItem'),
				oModel= this.getView().getModel("setting");
			
			var aSelectedContexts = oList.getSelectedContexts(true);
			var bSelected = aSelectedContexts && aSelectedContexts.length > 0;
			var iCountOfRepoAssigned = oListItem.getBindingContext("pipeline").getProperty("countOfRepoAssigned")

			oModel.setProperty("/pipelineTokenHasRepoAssigned", iCountOfRepoAssigned > 0);
			oModel.setProperty("/pipelineTokenVisible", true);
			oModel.setProperty("/pipelineTokenText",  oListItem.getBindingContext("pipeline").getProperty("name"));
			oModel.updateBindings(true);
		},

		removeAllSelection: function () {
			this.getView().byId("pipelineList").removeSelections(true);
		}
	});
});
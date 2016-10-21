sap.ui.define([
	"sap/ui/core/mvc/Controller", 'sap/ui/model/Filter', "sap/ui/model/json/JSONModel"
], function (Controller, Filter, JSONModel) {
	"use strict";
	
	return Controller.extend("sap.ciconnect.view.pipelines", {
		onInit: function() {
			/*var oModel = new JSONModel();
			oModel.loadData("../data/pipeline.json");
			this.getView().setModel(oModel);*/
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
		
		_updateCount: function () {
			this.getView().getParent().setCount(this.getView().getModel().getData().length);
		}
	});
});
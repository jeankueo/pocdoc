sap.ui.define([
	"sap/ui/core/mvc/Controller", 'sap/ui/model/Filter', "sap/ui/model/json/JSONModel",
	"../model/formatter"
], function (Controller, Filter, JSONModel, formatter) {
	"use strict";
	
	return Controller.extend("sap.ciconnect.view.pipelines", {
		formatter: formatter,

		onInit: function() {
			this._initData();
			this._aFilter = [];
		},

		_initData: function () {
			var oModel = new JSONModel();
			oModel.setData([{
				key: "ALL",
				text: "All",
				count: 6
			}, {
				key: "FIORI",
				text: "Fiori",
				count: 1
			}, {
				key: "SAPUI5",
				text: "UI5",
				count: 1
			}, {
				key: "HCP_CLASSIC",
				text: "HCP Classic",
				count: 1
			}, {
				key: "HCP_CF",
				text: "HCP Cloudfoundry",
				count: 1
			}]);
			this.getView().setModel(oModel, "category");
		},

		onSelectChange: function (oEvent) {
			
		},
		
		onSearch: function (oEvent) {
			// add filter for search
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var ofilter = new Filter("name", sap.ui.model.FilterOperator.Contains, sQuery);
				this._aFilter.push(ofilter);
			}
 
			// update list binding
			var oList = this.getView().byId("pipelineList");
			var obinding = oList.getBinding("items");
			obinding.filter(this._aFilter);
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
		},

		onAfterRendering: function () {
			this._adjustHeightOfScrollContainerForList();
		},

		onContainerResize: function () {
			this._adjustHeightOfScrollContainerForList();
		},

		_adjustHeightOfScrollContainerForList: function () {
			var $bar = jQuery("#"+this.getView().getParent().getParent().getParent().getId()),
				$container = jQuery("#" + this.getView().getContent()[1].getId());

			this.getView().getContent()[1].setHeight(($bar.offset().top + $bar.height() - $container.offset().top) + "px");
		}
	});
});
sap.ui.define([
	"../controller/BaseController", 'sap/ui/model/Filter', "sap/ui/model/json/JSONModel", "sap/m/MessageToast",
	"../model/formatter"
], function (BaseController, Filter, JSONModel, MessageToast, formatter) {
	"use strict";
	
	return BaseController.extend("sap.ciconnect.controller.Pipelines", {
		formatter: formatter,

		onInit: function() {
			this._initData();
			var oRouter = this.getRouter();
			this._oRouterArgs = null;
			oRouter.getRoute("appHome").attachMatched(this._onRouterMatched, this);
			oRouter.getRoute("one").attachMatched(this._onRouterMatched, this);
			this._oContent = {};
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

		_onRouterMatched: function (oEvent) {
			// save the current query state
			this._oRouterArgs = oEvent.getParameter("arguments");
			this._sRouteName = oEvent.getParameter("name");

			if (this._sRouteName === "one" ||
				this._sRouteName === "appHome" &&
				this._oRouterArgs[["?query"]] &&
				this._oRouterArgs[["?query"]].tab === "Pipelines") {

				if (this._oRouterArgs["?query"]) {
					this._applyAllSearchFilter(
						this._oRouterArgs["?query"].pipelineCategory || "ALL",
						this._oRouterArgs["?query"].pipelineSearch || "");
					this._applyViewStyle(this._oRouterArgs["?query"].pipelineView || "Tile");
				} else {
					this._applyAllSearchFilter("ALL", "");
					this._applyViewStyle("Tile");
				}
			}
		},

		_applyAllSearchFilter: function (sCategory, sSearch) {
			var aFilters = [];

			if (sCategory && sCategory !== "ALL") {
				aFilters.push(new Filter ("category", sap.ui.model.FilterOperator.EQ, sCategory));
			}
			this.getView().byId("categorySelect").setSelectedKey(sCategory ? sCategory : "ALL");

			if (sSearch) {
				aFilters.push(new Filter("name", sap.ui.model.FilterOperator.Contains, sSearch));
			}
			this.getView().byId("searchField").setValue(sSearch ? sSearch : "");

			var oCollection = this.getView().byId("splitter").getContentAreas()[0];
			if (oCollection) {
				var obinding = oCollection.getBinding("items");
				obinding.filter(aFilters);
			}
		},

		_applyViewStyle: function (sViewStyle) {
			var oSplitter = this.getView().byId("splitter");

			this._oContent[sViewStyle] = this._oContent[sViewStyle] ||
				new sap.ui.xmlfragment("sap.ciconnect.fragment.Pipelines" + sViewStyle, this);

			oSplitter.removeContentArea(this.getCurrentContent());
			oSplitter.addContentArea(this._oContent[sViewStyle]);

			this.getView().byId("segButton").setSelectedKey(sViewStyle);
			// sync selection between Tile and List view if selection context exist
			if (this._oSelectedBindingContext) {
				switch(sViewStyle) {
				case "List":
					var aListItem = this._oContent.List.getItems();
					for (var i = 0; i < aListItem.length; i++) {
						if (aListItem[i].getBindingContext("pipeline").getPath() === this._oSelectedBindingContext.getPath()){
							this._oContent.List.setSelectedItem(aListItem[i]);
							break;
						}
					}
					break;
				default: // Tile
					this._changeTileHeadImage();
				}
			}
		},

		onSelectChange: function (oEvent) {
			var sSelectKey = oEvent.getSource().getSelectedKey();
			this._oRouterArgs["?query"] = this._oRouterArgs["?query"] || {};
			this._oRouterArgs["?query"].pipelineCategory = sSelectKey;
			this.getRouter().navTo(this._sRouteName || "appHome", {
				query: this._oRouterArgs["?query"]
			}, true /*no history*/)
		},
		
		onSearch: function (oEvent) {
			var sQuery = oEvent.getSource().getValue();
			this._oRouterArgs["?query"] = this._oRouterArgs["?query"] || {};
			this._oRouterArgs["?query"].pipelineSearch = sQuery;
			this.getRouter().navTo(this._sRouteName || "appHome", {
				query: this._oRouterArgs["?query"]
			}, true /*no history*/)
		},

		onTilePress: function (oEvent) {
			this._oSelectedBindingContext = oEvent.getSource().getBindingContext("pipeline");
			this._changeTileHeadImage();
			this._applyPipelineSelectionChange();
		},

		_changeTileHeadImage: function (bRemoveAll) {
			var aTiles = this.getCurrentContent().getItems();
			for (var i = 0; i < aTiles.length; i++) {
				if (bRemoveAll) {
					aTiles[i].setHeaderImage();
				} else if (aTiles[i].getBindingContext("pipeline").getPath() === this._oSelectedBindingContext.getPath()) {
					aTiles[i].setHeaderImage("sap-icon://accept");
				} else {
					aTiles[i].setHeaderImage();
				}
			}
		},

		onSelectionChange: function (oEvent) {
			var oList = oEvent.getSource(),
				oListItem = oEvent.getParameter('listItem');
			this._oSelectedBindingContext = oListItem.getBindingContext("pipeline");
			this._applyPipelineSelectionChange();
		},

		getSelectedBindingContext: function () {
			return this._oSelectedBindingContext;
		},	

		_applyPipelineSelectionChange: function (oContext) {
			var oModel= this.getView().getModel("setting"),
				aRepoAssigned = this._oSelectedBindingContext.getProperty("reposAssigned");;

			oModel.setProperty("/pipelineTokenHasRepoAssigned", aRepoAssigned && aRepoAssigned.length > 0);
			oModel.setProperty("/pipelineTokenVisible", true);
			oModel.setProperty("/pipelineTokenText",  this._oSelectedBindingContext.getProperty("name"));
			oModel.updateBindings(true);
		},

		removeAllSelection: function () {
			var oPipelineCollection = this.getCurrentContent(),
				oModel= this.getView().getModel("setting");

			if (oPipelineCollection.removeSelections) {
				oPipelineCollection.removeSelections(true);
			} else {
				this._changeTileHeadImage(true);
			}
			
			this._oSelectedBindingContext = undefined;

			oModel.setProperty("/pipelineTokenHasRepoAssigned", false);
			oModel.setProperty("/pipelineTokenVisible", false);
			oModel.setProperty("/pipelineTokenText",  undefined);
			oModel.updateBindings(true);
		},

		onAfterRendering: function () {
			this._adjustHeightOfScrollContainerForList("pipelinesVBox");
		},

		onContainerResize: function () {
			this._adjustHeightOfScrollContainerForList("pipelinesVBox");
		},

		onNavDetail: function (oEvent) {
			var sPath = oEvent.getSource().getBindingContext("pipeline").getPath();
			this.getRouter().navTo("pipeline", {
				//key: oBindingContext.getProperty("key")
				index: sPath.substr(sPath.lastIndexOf("/") + 1)
			});
		},

		onViewStyleChange: function (oEvent) {
			var sQuery = oEvent.getParameter("key");
			this._oRouterArgs["?query"] = this._oRouterArgs["?query"] || {};
			this._oRouterArgs["?query"].pipelineView = sQuery;
			this.getRouter().navTo(this._sRouteName || "appHome", {
				query: this._oRouterArgs["?query"]
			}, true /*no history*/)
		},

		getCurrentContent: function () {
			return this.getView().byId("splitter").getContentAreas()[0];
		},

		onPipelineNodeClick: function (oEvent) {
			var oParam = oEvent.getParameter("params"),
				oContext = oEvent.getSource().getBindingContext("pipeline");
			MessageToast.show("node " + oParam[0] + " clicked!");
			var oPipelineData = oContext.getModel().getProperty(oContext.getPath()),
				sJobId = oParam[1];

			if (oPipelineData && oPipelineData.abstract &&
				oPipelineData.abstract.stages &&
				oPipelineData.abstract.stages.length > 0) {

				var aStages = oPipelineData.abstract.stages
				for (var i = 0; i < aStages.length; i++) {
					if (aStages[i].id === sJobId && aStages[i].link) {
						window.open(aStages[i].link, "_blank");
						return;
					}
				}
				window.open("https://github.wdf.sap.corp/ci-connect/pipeline-ui-poc", "_blank");
			}
		}
	});
});
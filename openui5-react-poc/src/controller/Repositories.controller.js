sap.ui.define([
	"./BaseController", 'sap/ui/model/Filter', "sap/ui/model/json/JSONModel", "sap/m/MessageToast"
], function (BaseController, Filter, JSONModel, MessageToast) {
	"use strict";
	
	return BaseController.extend("sap.ciconnect.controller.Repositories", {
		onInit: function() {
			this._iSelectCount = 0;
			this._initData();
			var oRouter = this.getRouter();
			this._oRouterArgs = null;
			oRouter.getRoute("appHome").attachMatched(this._onRouterMatched, this);
		},

		_initData: function () {
			var oModel = new JSONModel();
			oModel.setData([{
				key: "ALL",
				text: "All",
				count: 10
			}, {
				key: "GITHUB",
				source: "github",
				text: "Github",
				count: 8
			}, {
				key: "GITHUB-ciconnect",
				source: "github",
				org: "ciconnect",
				text: "Github-ciconnect",
				count: 5
			}, {
				key: "GITHUB-i037379",
				source: "github",
				org: "i037379",
				text: "Github-i037379",
				count: 3
			}, {
				key: "GIT",
				source: "git",
				text: "Git",
				count: 2
			}]);
			this.getView().setModel(oModel, "category");
		},

		_onRouterMatched: function (oEvent) {
			// save the current query state
			this._oRouterArgs = oEvent.getParameter("arguments");
			if (this._oRouterArgs[["?query"]] && this._oRouterArgs[["?query"]].tab === "Repositories") {
				this._applyAllSearchFilter(this._oRouterArgs["?query"].source, this._oRouterArgs["?query"].org, this._oRouterArgs["?query"].search);
			}
		},

		_applyAllSearchFilter: function (sSource, sOrg, sSearch) { 
			var aFilters = [];

			if (sSource) {
				aFilters.push(new Filter ("repo_source", sap.ui.model.FilterOperator.EQ, sSource));
			}
			if (sSource === "github" && sOrg) {
				aFilters.push(new Filter ("org", sap.ui.model.FilterOperator.EQ, sOrg));
			}

			switch(sSource){
			case "git":
				this.getView().byId("categorySelect").setSelectedKey("GIT");
				break;
			case "github":
				this.getView().byId("categorySelect").setSelectedKey("GITHUB" + sOrg ? "-" + sOrg : "");
				break;
			default:
				this.getView().byId("categorySelect").setSelectedKey("ALL");
			}

			if (sSearch) {
				aFilters.push(new Filter("full_name", sap.ui.model.FilterOperator.Contains, sSearch));
			}
			this.getView().byId("searchField").setValue(sSearch ? sSearch : "");

			var oList = this.getView().byId("repoList");
			var obinding = oList.getBinding("items");
			obinding.filter(aFilters);
		},

		onSelectChange: function (oEvent) {
			var oSelectData = this.getView().getModel("category").getProperty(
				oEvent.getParameter("selectedItem").getBindingContext("category").getPath());
			if (oSelectData.source) {
				this._oRouterArgs["?query"].source = oSelectData.source;
			} else {
				delete this._oRouterArgs["?query"].source;
			}
			if (oSelectData.org) {
				this._oRouterArgs["?query"].org = oSelectData.org;
			} else {
				delete this._oRouterArgs["?query"].org;
			}
			this.getRouter().navTo("appHome", {
				query: this._oRouterArgs["?query"]
			}, true /*no history*/)
		},
		
		onSearch: function (oEvent) {
			var sQuery = oEvent.getSource().getValue();
			this._oRouterArgs["?query"].search = sQuery;
			this.getRouter().navTo("appHome", {
				query: this._oRouterArgs["?query"]
			}, true /*no history*/)
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
				var bRepoAssigned = false,
					bGitSelected = false;
				for (var i = 0; i < iSelectedCount; i++) {
					bRepoAssigned = bRepoAssigned || !!aRepoSelectedContexts[i].getProperty("pipeline");
					bGitSelected = bGitSelected || (aRepoSelectedContexts[i].getProperty("repo_source") === "git");
				}
				oModel.setProperty("/repoTokenVisible", true);
				oModel.setProperty("/repoTokenNumber",  iSelectedCount);
				oModel.setProperty("/repoTokenHasPipelineAssigned",  bRepoAssigned);
				oModel.setProperty("/repoTokenGitSelected",  bGitSelected);
			} else {
				oModel.setProperty("/repoTokenVisible", false);
				oModel.setProperty("/repoTokenHasPipelineAssigned",  false);
				oModel.setProperty("/repoTokenHasPipelineAssigned",  false);
				oModel.setProperty("/repoTokenGitSelected",  false);
			}
			oModel.updateBindings(true);
		},

		removeAllSelection: function () {
			this.getView().byId("repoList").removeSelections(true);
			this._updateRepoToken();
		},

		selectAll: function () {
			this.getView().byId("repoList").selectAll();
			this._updateRepoToken();
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
		},

		onNavDetail: function (oEvent) {
			var sPath = oEvent.getSource().getBindingContext("repo").getPath();
			this.getRouter().navTo("repository", {
				//id: oBindingContext.getProperty("id")
				index: sPath.substr(sPath.indexOf("/") + 1)
			});
		},

		onPipelineNodeClick: function (oEvent) {
			var oParam = oEvent.getParameter("params");
			MessageToast.show("node " + oParam[0] + " clicked!");
		}
	});
});
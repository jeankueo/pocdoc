sap.ui.define([
	"sap/ui/core/mvc/Controller", 'sap/ui/model/Filter', "sap/ui/model/json/JSONModel"
], function (Controller, Filter, JSONModel) {
	"use strict";
	
	return Controller.extend("sap.ciconnect.view.repositories", {
		onInit: function() {
			this._iSelectCount = 0;
			this._oSelectRepoSourceFilter = undefined;
			this._oSelectOrgFilter = undefined;
			this._oSearchFilter = undefined;
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
				source: "github",
				text: "Github",
				count: 8
			}, {
				key: "GITHUB-O1",
				source: "github",
				org: "ciconnect",
				text: "Github-ciconnect",
				count: 5
			}, {
				key: "GITHUB-O2",
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

		onSelectChange: function (oEvent) {
			var aFilters = [];

			if (this._oSearchFilter) {
				aFilters.push(this._oSearchFilter);
			}

			var oSelectData = this.getView().getModel("category").getProperty(
				oEvent.getParameter("selectedItem").getBindingContext("category").getPath());

			this._oSelectRepoSourceFilter = undefined;
			this._oSelectOrgFilter = undefined;
			if (oSelectData.key !== "ALL") {
				this._oSelectRepoSourceFilter = new Filter("repo_source",
					sap.ui.model.FilterOperator.EQ, oSelectData.source);
				aFilters.push(this._oSelectRepoSourceFilter);
				if (oSelectData.org) {
					this._oSelectOrgFilter  = new Filter("org", sap.ui.model.FilterOperator.EQ, oSelectData.org);
					aFilters.push(this._oSelectOrgFilter);
				}
			}

			var oList = this.getView().byId("repoList");
			var obinding = oList.getBinding("items");
			obinding.filter(aFilters);
		},
		
		onSearch: function (oEvent) {
			var aFilters = [];
			if (this._oSelectRepoSourceFilter) {
				aFilters.push(this._oSelectRepoSourceFilter);
			}
			if (this._oSelectOrgFilter) {
				aFilters.push(this._oSelectOrgFilter);
			}

			var sQuery = oEvent.getSource().getValue();
			
			this._oSearchFilter = undefined;
			if (sQuery && sQuery.length > 0) {
				this._oSearchFilter = new Filter("full_name", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(this._oSearchFilter);
			}
 
			var oList = this.getView().byId("repoList");
			var obinding = oList.getBinding("items");
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
		}
	});
});
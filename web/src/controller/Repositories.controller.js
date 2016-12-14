sap.ui.define([
	"./BaseController", 'sap/ui/model/Filter', "sap/ui/model/json/JSONModel", "sap/m/MessageToast",
	"sap/m/Dialog", "sap/m/Button", "sap/m/Text"
], function (BaseController, Filter, JSONModel, MessageToast, Dialog, Button, Text) {
	"use strict";
	
	return BaseController.extend("sap.ciconnect.controller.Repositories", {
		onInit: function() {
			this._iSelectCount = 0;
			this._initData();
			var oRouter = this.getRouter();
			this._oRouterArgs = null;
			oRouter.getRoute("appHome").attachMatched(this._onRouterMatched, this);
			oRouter.getRoute("one").attachMatched(this._onRouterMatched, this);
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
			this._sRouteName = oEvent.getParameter("name");

			if (this._sRouteName === "one" ||
				this._sRouteName === "appHome" &&
				this._oRouterArgs[["?query"]] && 
				this._oRouterArgs[["?query"]].tab === "Repositories") {

				if (this._oRouterArgs["?query"]) {
					this._applyAllSearchFilter(this._oRouterArgs["?query"].repoSource || "",
						this._oRouterArgs["?query"].repoOrg || "", this._oRouterArgs["?query"].repoSearch || "");
				} else {
					this._applyAllSearchFilter("", "", "");
				}
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

			this._oRouterArgs["?query"] = this._oRouterArgs["?query"] || {};
			if (oSelectData.source) {
				this._oRouterArgs["?query"].repoSource = oSelectData.source;
			} else {
				delete this._oRouterArgs["?query"].repoSource;
			}
			if (oSelectData.org) {
				this._oRouterArgs["?query"].repoOrg = oSelectData.org;
			} else {
				delete this._oRouterArgs["?query"].repoOrg;
			}
			this.getRouter().navTo(this._sRouteName || "appHome", {
				query: this._oRouterArgs["?query"]
			}, true /*no history*/)
		},
		
		onSearch: function (oEvent) {
			var sQuery = oEvent.getSource().getValue();
			this._oRouterArgs["?query"] = this._oRouterArgs["?query"] || {};
			this._oRouterArgs["?query"].repoSearch = sQuery;
			this.getRouter().navTo(this._sRouteName || "appHome", {
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

		onDeselectAll: function () {
			this.removeAllSelection();
		},

		removeAllSelection: function () {
			this.getView().byId("repoList").removeSelections(true);
			this._updateRepoToken();
		},

		onSelectAll: function () {
			this.selectAll();
		},

		selectAll: function () {
			this.getView().byId("repoList").selectAll();
			this._updateRepoToken();
		},

		onAfterRendering: function () {
			this._setPanelHeightByPageContainer("repoPanel");
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
		},

		onAddGitRepo: function (oEvent) {
			// both button and input field works in this way
			var sURL = oEvent.getSource().getParent().getContent()[1].getValue();
			//TODO: url validity check
			this._addGitRepoData(sURL);
		},

		_addGitRepoData: function (sURL) {
			if (sURL) {
				var oModel = this.getView().getModel("repo");
				var oData = oModel.getData();
				oData.push({
					"name": "new rep",
					"full_name": "new git repository " + sURL,
					"repo_source": "git",
					"with_gerrit": (Math.random() > 0.5 ? true : false),
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
					"private": (Math.random() > 0.5 ? true : false),
					"folked": (Math.random() > 0.5 ? true : false)
				});
				oModel.setData(oData);
				oModel.updateBindings(true); // force counter in tab to update
			}
		},

		onPopDelete: function (oEvent) {
			var oRepoModel = this.getView().getModel("repo"),
				oSettingModel = this.getView().getModel("setting"),
				oRepoList = this.getView().byId("repoList");
			var aSelectedGitContext = this._buildSelectedGitContext(oRepoModel, oRepoList);

			if (aSelectedGitContext.length > 0) {
				var oDialog = new Dialog({
					title: "Confirm to Delete Git Repository",
					type: "Message",
					content: new Text({
						text: aSelectedGitContext.length + " of the selected repositories are git repository. Are you sure youwant to delete?"
					}),
					beginButton: new Button({
						text: "Confirm",
						press: function () {// mocking deletion, TODO: replace with real logic
							var aData = oRepoModel.getData();
							for (var i =aSelectedGitContext.length - 1; i >=0; i-- ) {
								aData.splice(aData.indexOf(oRepoModel.getProperty(aSelectedGitContext[i].getPath())), 1)
							}
							oRepoModel.setData(aData);
							oDialog.destroy();
							oSettingModel.setProperty("/repoTokenVisible", oSettingModel.getProperty("/repoTokenNumber") > aSelectedGitContext.length);
							oSettingModel.setProperty("/repoTokenNumber",  aData.length);
							oSettingModel.setProperty("/repoTokenGitSelected",  false);
						}
					}),
					endButton: new Button({
						text: "Cancel",
						press: function () {
							oDialog.destroy();
						}
					}),
					afterClose: function () {
						oDialog.destroy();
					}
				});
				oDialog.open();
			}
		},

		_buildSelectedGitContext: function (oRepoModel, oRepoList) {
			var aRetVal = [], oData;
			var aSelectedContexts = oRepoList.getSelectedContexts(true);
			for (var i = 0; i < aSelectedContexts.length; i++) {
				oData = oRepoModel.getProperty(aSelectedContexts[i].getPath());
				if (oData.repo_source === "git") {
					aRetVal.push(aSelectedContexts[i]);
				}
			}
			return aRetVal;
		}
	});
});
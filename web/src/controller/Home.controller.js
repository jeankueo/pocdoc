sap.ui.define([
	"./BaseController", "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";
	
	var _aValidTabKeys = ["Summary", "Pipelines", "Repositories"];

	return BaseController.extend("sap.ciconnect.controller.Home", {

		onInit: function () {
			this.getRouter().getRoute("appHome").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function (oEvent) {
			var oArgs, oView, oQuery;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			oQuery = oArgs["?query"] || {};
			if (oQuery.tab && _aValidTabKeys.indexOf(oQuery.tab) > -1){
				oView.getModel("setting").setProperty("/selectedTabKey", oQuery.tab);
			} else {
				// the default query param should be visible at all time
				oQuery.tab =  _aValidTabKeys[0];
				this.getRouter().navTo("appHome", {query: oQuery}, true /* no history */);
			}
		},

		onTabSelect: function (oEvent) {
			this.getRouter().navTo("appHome", {
				query: {
					tab : oEvent.getParameter("selectedKey")
				}
			}, true /*without history*/);
		},

		onPipelineTokenPressed: function (oEvent) {
			this.getView().getModel("setting").setProperty("/selectedTabKey", "Pipelines");
		},
		
		onPipelineTokenDelete: function (oEvent) {
			var oModel = this.getView().getModel("setting");
			oModel.setProperty("/pipelineTokenVisible", false);
			oModel.setProperty("/pipelineTokenText", undefined);
			oModel.updateBindings(true);

			this.getView().byId("pipelineView").getController().removeAllSelection();
		},

		onRepoTokenPressed: function (oEvent) {
			this.getView().getModel("setting").setProperty("/selectedTabKey", "Repositories");
		},

		onRepoTokenDelete: function (oEvent) {
			var oModel = this.getView().getModel("setting");
			oModel.setProperty("/repoTokenVisible", false);
			oModel.setProperty("/repoTokenNumber", undefined);
			oModel.updateBindings(true);

			this.getView().byId("repoView").getController().removeAllSelection();
		},

		onPopAssign: function (oEvent) {
			this._showPopOverFragment(
				oEvent.getSource(), 
				"AssignPopover",
				this._buildAssignModel());
		},

		_buildAssignModel: function () {
			var aSelectedRepoContext = this.getView().byId("repoView").byId("repoList").getSelectedContexts(true),
				oSelectedPipelineContext = this.getView().byId("pipelineView").getController().getSelectedBindingContext(),
				aAssignData = [],
				aChangeData = [],
				aNoChangeData = [],
				oData;

			var oSelectedPipelineData = oSelectedPipelineContext.getModel().getProperty(oSelectedPipelineContext.getPath());
			for (var i = 0; i < aSelectedRepoContext.length; i++) {
				oData = aSelectedRepoContext[i].getModel().getProperty(aSelectedRepoContext[i].getPath());
				if (oData.pipeline) {
					if (oData.pipeline.id === oSelectedPipelineData.key) {
						aNoChangeData.push(oData);
					} else {
						aChangeData.push(oData);
					}
				} else {
					aAssignData.push(oData);
				}
			}

			return new JSONModel({
				pipeline: oSelectedPipelineData,
				assign: aAssignData,
				change: aChangeData,
				noChange: aNoChangeData
			});
		},

		onPopUnassign: function (oEvent) {
			this._showPopOverFragment(
				oEvent.getSource(), 
				"UnassignPopover",
				this._buildUnassignModel());
		},

		_buildUnassignModel: function (oEvent) {
			var oSelectedPipelineContext = this.getView().byId("pipelineView").getController().getSelectedBindingContext(),
				aSelectedRepoContext = this.getView().byId("repoView").byId("repoList").getSelectedContexts(true),
				aUnassignFromSelectedPipeline = [],
				oPipelineData,
				oRepoData,
				aRepoData = [];

			if (oSelectedPipelineContext) { // pipeline is selected
				oPipelineData = oSelectedPipelineContext.getModel().getProperty(oSelectedPipelineContext.getPath());
			}

			if (aSelectedRepoContext.length > 0) {
				// record other pipelines which is recorded in selected repo
				for (var i = 0; i < aSelectedRepoContext.length; i++) {
					oRepoData = aSelectedRepoContext[i].getModel().getProperty(aSelectedRepoContext[i].getPath());
					if (oRepoData.pipeline && (!oPipelineData|| oRepoData.pipeline.id !== oPipelineData.key)) {
						aRepoData.push(oRepoData);
					}
				}
			}

			return new JSONModel({
				pipeline: oPipelineData,
				repo: aRepoData
			});
		},

		onPopAdd: function (oEvent) {
			this.getView().getModel("setting").setProperty("/selectedTabKey", "Repositories");
			this._showPopOverFragment(oEvent.getSource(), "AddGitPopover");
		},

		onPopDelete: function (oEvent) {
			this.getView().getModel("setting").setProperty("/selectedTabKey", "Repositories");
			this._showPopOverFragment(
				oEvent.getSource(),
				"DeleteGitPopover", 
				this._buildSelectedGitListModel());
		},

		_buildSelectedGitListModel: function () {
			var oRetModel = new JSONModel(),
				oRepoModel = this.getView().getModel("repo"),
				aData = [], oData,
				oRepoList = this.getView().byId("repoView").byId("repoList");

			var aSelectedContexts = oRepoList.getSelectedContexts(true);
			for (var i = 0; i < aSelectedContexts.length; i++) {
				oData = oRepoModel.getProperty(aSelectedContexts[i].getPath());
				if (oData.repo_source === "git") {
					aData.push(oData);
				}
			}
			oRetModel.setData(aData);

			return oRetModel;
		},

		_showPopOverFragment: function (oHolder, sPopOverFragmentName, oModel) {
			if (this._oPopover) {
				this._oPopover.destroy();
			}
			this._oPopover = new sap.ui.xmlfragment("sap.ciconnect.fragment." + sPopOverFragmentName, this);
			if (oModel) {
				this._oPopover.setModel(oModel);
			}
			//this.getView().addDependent(this._oPopover);
			jQuery.sap.delayedCall(0, this, function () {
				this._oPopover.openBy(oHolder);
			})
		},

		onAddGitRepo: function (oEvent) {
			// both button and input field works in this way
			var sURL = oEvent.getSource().getParent().getContent()[0].getValue();
			//TODO: url validity check
			this._addGitRepoData(sURL);
			this._closePopover();
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

		onPopoverAcceptAll: function (oEvent) {
			//TODO: logic to accept all in popover
			console.log("onPopoverAcceptAll is triggered by " + oEvent.getSource().getId());
			this._closePopover();
		},

		onPopoverClose: function () {
			this._closePopover();
		},

		_closePopover: function () {
			if (this._oPopover) {
				this._oPopover.close();
			}
		},

		onPopoverAcceptGroup: function (oEvent) {
			//TODO: logic to accept group in popover
			console.log("onPopoverAcceptGroup is triggered by " + oEvent.getSource().getId());
			this._deleteGroupFromPopover(oEvent);
		},

		onPopoverCloseGroup: function (oEvent) {
			this._deleteGroupFromPopover(oEvent);
		},

		/*
		 * Pre-assumption of this method is
		 * 1. model is anonymous, then getBindingContext() works
		 * 2. each group is an named array, name is after last slash of path
		 */
		_deleteGroupFromPopover: function (oEvent) {
			var sDataName = oEvent.getSource().data("dataName"),
				oModel = oEvent.getSource().getModel();
			var oData = oModel.getData();
			delete oData[sDataName];
			oModel.setData(oData);
		},

		onPopoverAcceptItem: function (oEvent) {
			//TODO: logic to accept item in popover
			console.log("onPopoverAcceptItem is triggered by " + oEvent.getSource().getId());
			this._deleteItemFromPopover(oEvent);
		},

		onPopoverCloseItem: function (oEvent) {
			this._deleteItemFromPopover(oEvent);
		},

		/*
		 * Pre-assumption of this method is
		 * 1. model is anonymous, then getBindingContext() works
		 * 2. each item is part of an array, then lastIndex of "/" is always followed with an Integer >= 0
		 */
		_deleteItemFromPopover: function (oEvent) {
			var oBindingContext = oEvent.getSource().getBindingContext();
			var sItemPath = oBindingContext.getPath();
			var sArrayPath = sItemPath.substring(0, sItemPath.lastIndexOf("/") + 1);
			var aData = oBindingContext.getModel().getProperty(sArrayPath),
				oData = oBindingContext.getModel().getProperty(sItemPath);
			aData.splice(jQuery.inArray(oData, aData), 1);
			oBindingContext.getModel().setProperty(sArrayPath, aData);
		},

		onSelectAll: function () {
			this.getView().byId("repoView").getController().selectAll();
		},

		onDeselectAll: function () {
			var sTabKey = this.getView().getModel("setting").getProperty("/selectedTabKey"),
				sViewName;
			 if (sTabKey === "Pipelines") {
			 	sViewName = "pipelineView";
			 } else if (sTabKey === "Repositories") {
			 	sViewName = "repoView";
			 }

			this.getView().byId(sViewName).getController().removeAllSelection();
		},

		onExit: function () {
			if (this._oPopover) {
				this._oPopover.destroy();
			}
		}
	});
});
sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/ui/core/IconPool"
], function (Controller, JSONModel, IconPool) {
	"use strict";
	
	return Controller.extend("sap.ciconnect.view.index", {
		onInit: function() {
			this._registerIcons();
			this._loadData();
		},
		
		_registerIcons: function () {
			this._registerPerLib({
				fontFamily: "oct",
				collectionName: "oct",
				icons : [
					["octicon-repo-forked", "f002"], ["octicon-repo", "f001"], 
					["octicon-octoface", "f008"], ["octicon-mark-github", "f00a"],
					["octicon-shield", "f0e1"]
				]
			});
			
			this._registerPerLib({
				fontFamily: "awesome",
				collectionName: "awesome",
				icons : [
					["fa-git-square", "f1d2"], ["fa-pied-piper-pp", "f1a7"], ["fa-hand-paper-o", "f256"]
				]
			});
		},
		
		_registerPerLib: function (oIcons) {
			for (var i = 0; i < oIcons.icons.length; i++) {
				IconPool.addIcon(
					oIcons.icons[i][0], 
					oIcons.collectionName, 
					oIcons.fontFamily, 
					oIcons.icons[i][1],
					false,
					true);
			}
		},
		
		_loadData: function () {
			this._loadPipelineData();
			this._loadRepoData();
			this._initSettingData();

			this.getView().setModel("selectedRepo", new JSONModel());
			this.getView().setModel("selectedPipeline", new JSONModel());
		},

		_loadPipelineData: function () {
			var oModel = new JSONModel();
			oModel.loadData("../../../data/pipeline.json");
			this.getView().setModel(oModel, "pipeline");
		},

		_loadRepoData: function () {
			// repo contains all repo from git/gerrit/github
			var oModel = new JSONModel();
			oModel.loadData("../../../data/repo.json");
			this.getView().setModel(oModel, "repo");
		},

		_initSettingData: function () {
			var oModel = new JSONModel();
			oModel.setData({
				// tab selection
				"selectedTabKey": "Summary",
				
				// pipeline&job control related
				"jobStyle": "CircleWithTextAbove",
				"enableConnection": true,
				"enableText": true,
				"enableTwoRow": true,
				
				// pipeline token related
				"pipelineTokenVisible": false,
				"pipelineTokenText": undefined,
				"pipelineTokenHasRepoAssigned": false,
				
				// repo token related
				"repoTokenVisible": false,
				"repoTokenText": undefined,
				"repoTokenHasPipelineAssigned": false,
				"repoTokenGitSelected": false
			});
			this.getView().setModel(oModel, "setting");
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
			var oRetModel = new JSONModel(),
				aSelectedRepoContext = this.getView().byId("repoView").byId("repoList").getSelectedContexts(true),
				aSelectedPipelineContext = this.getView().byId("pipelineView").byId("pipelineList").getSelectedContexts(true),
				aAssignData = [],
				aChangeData = [],
				aNoChangeData = [],
				oData;

			var oSelectedPipelineData = aSelectedPipelineContext[0].getModel().getProperty(aSelectedPipelineContext[0].getPath());
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

			oRetModel.setData({
				pipeline: oSelectedPipelineData,
				assign: aAssignData,
				change: aChangeData,
				noChange: aNoChangeData
			});

			return oRetModel;
		},

		onPopUnassign: function (oEvent) {
			this._showPopOverFragment(oEvent.getSource(), "UnassignPopover");
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
			var sArrayPath = sItemPath.substring(0, sItemPath.lastIndexOf("/"));
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
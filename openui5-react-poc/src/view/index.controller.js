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
					["fa-git-square", "f1d2"], ["fa-pied-piper-pp", "f1a7"]
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
				"repoTokenText": undefined
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
			this._showPopOverFragment(oEvent.getSource(), "AssignPopover");
		},

		onPopUnassign: function (oEvent) {
			this._showPopOverFragment(oEvent.getSource(), "UnassignPopover");
		},

		onPopAdd: function (oEvent) {
			this.getView().getModel("setting").setProperty("/selectedTabKey", "Repositories");
			this._showPopOverFragment(oEvent.getSource(), "UrlPopover");
		},

		_showPopOverFragment: function (oHolder, sPopOverFragmentName) {
			if (this._oPopover) {
				this._oPopover.destroy();
			}
			this._oPopover = new sap.ui.xmlfragment("sap.ciconnect.fragment." + sPopOverFragmentName, this);
			//this.getView().addDependent(this._oPopover);
			jQuery.sap.delayedCall(0, this, function () {
				this._oPopover.openBy(oHolder);
			})
		},

		onAddGitRepo: function (oEvent) {
			this._addGitRepoData(oEvent);
			this._closePopover();
		},

		_addGitRepoData: function (oEvent) {
			var sURL = oEvent.getSource().getValue();
			if (sURL) {
				var oModel = this.getView().getModel("repo");
				var oData = oModel.getData();
				oData.push({
					"name": "new rep",
					"full_name": "new git repository " + sURL,
					"repoType": (Math.random() > 0.5 ? "git" : "git+gerrit"),
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
				oEvent.getSource().setValue();
			}
		},

		_closePopover: function () {
			if (this._oPopover) {
				this._oPopover.close();
			}
		},

		onExit: function () {
			if (this._oPopover) {
				this._oPopover.destroy();
			}
		}
	});
});
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
			var oModel;
			
			oModel = new JSONModel();
			oModel.loadData("../../../data/pipeline.json");
			this.getView().setModel(oModel, "pipeline");

			oModel = new JSONModel();
			oModel.loadData("../../../data/githubrepo.json");
			this.getView().setModel(oModel, "github");

			oModel = new JSONModel();
			oModel.loadData("../../../data/gitrepo.json");
			this.getView().setModel(oModel, "git");
			
			oModel = new JSONModel();
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
		}
	});
});
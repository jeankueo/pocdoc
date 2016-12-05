sap.ui.define([
	"./BaseController", "sap/ui/model/json/JSONModel", "sap/ui/model/odata/v2/ODataModel", "sap/ui/core/IconPool"
], function (BaseController, JSONModel, ODataModel, IconPool) {
	"use strict";
	
	return BaseController.extend("sap.ciconnect.controller.App", {
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
			this._initSettingData();
			this._loadPipelineData();
			this._loadRepoData();

			this.getView().setModel("selectedRepo", new JSONModel());
			this.getView().setModel("selectedPipeline", new JSONModel());
		},

		_loadPipelineData: function () {
			var oModel = new JSONModel();
			//oModel.loadData("../data/pipeline.json");
			oModel.loadData(this._determinOdataHost() + "/odata/pipelines");
			/*var oModel = new ODataModel({
				serviceUrl: this._determinOdataHost() + "/odata/pipelines",
				synchronizationMode: "None",
				useBatch: false
			});*/
			this.getView().setModel(oModel, "pipeline");
		},

		_loadRepoData: function () {
			// repo contains all repo from git/gerrit/github
			var oModel = new JSONModel();
			oModel.loadData("../data/repo.json");
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

		_determinOdataHost: function () {
			return window.location.host.endsWith("cfapps.sap.hana.ondemand.com") ?
				"https://ciconnect-pipeline-db.cfapps.sap.hana.ondemand.com" :
				"http://localhost:5000";
		}
	});
});
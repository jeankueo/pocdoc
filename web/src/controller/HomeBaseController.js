sap.ui.define([
	"./BaseController", "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";
	
	return BaseController.extend("sap.ciconnect.controller.HomeBaseController", {
		onPipelineTokenDelete: function (oEvent) {
			var oModel = this.getView().getModel("setting");
			oModel.setProperty("/pipelineTokenVisible", false);
			oModel.setProperty("/pipelineTokenText", undefined);
			oModel.updateBindings(true);

			this.getView().byId("pipelineView").getController().removeAllSelection();
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

		onPopoverAcceptAll: function (oEvent) {
			//TODO: logic to accept all in popover
			console.log("onPopoverAcceptAll is triggered by " + oEvent.getSource().getId());
			this._closePopover();
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
		}
	});
});
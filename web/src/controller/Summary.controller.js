sap.ui.define([
	"./BaseController", "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";
	
	return BaseController.extend("sap.ciconnect.controller.Summary", {
		onPress: function(oEvent) {
			switch(oEvent.getSource().getHeader()){
			case "Pipeline Report":
				this.getView().getModel("setting").setProperty("/selectedTabKey", "Pipelines");
				break;
			case "Repository Report":
				this.getView().getModel("setting").setProperty("/selectedTabKey", "Repositories");
				break;
			}
			
		}
	});
});
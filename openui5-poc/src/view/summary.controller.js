sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"], function (Controller, JSONModel) {
	"use strict";
	
	return Controller.extend("sap.ciconnect.view.summary", {
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
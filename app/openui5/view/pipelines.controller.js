sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"], function (Controller, JSONModel) {
	"use strict";
	
	return Controller.extend("sap.ciconnect.view.pipelines", {
		onInit: function() {
			var oModel = new JSONModel();
			oModel.loadData("../data/pipeline.json");
			this.getView().setModel(oModel);
		},
		
		onAfterRendering: function () {
			this.getView().getParent().setCount(this.getView().getModel().getData().length);
		}
	});
});
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";
	return Controller.extend("sap.ciconnect.BaseController", {

		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onNavBack: function (oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("appHome", {}, true /*no history*/);
			}
		},

		_adjustHeightOfScrollContainerForList: function (sContentId) {
			// the page finding logic base on an assumption, that there must be a page on the parent path of current view
			var oPage = this.getView();
			while(oPage.getMetadata().getName() !== "sap.m.Page" && oPage.getParent()) {
				oPage = oPage.getParent();
			};
			// adjust height only if find nearest page control
			if (oPage.getMetadata().getName() === "sap.m.Page") {
				var $page = oPage.getDomRef("cont"),
					$content = jQuery("#" + this.getView().byId(sContentId).getItems()[1].getId());

				this.getView().byId(sContentId).getItems()[1].setHeight(($page.offsetTop + $page.offsetHeight - $content.offset().top) + "px");
			}
		},
	});
});
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

		_adjustHeightOfScrollContainerForContentInsidePage: function (sContentId) {
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

		// for any view which need a popOver
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

		onPopoverClose: function () {
			this._closePopover();
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
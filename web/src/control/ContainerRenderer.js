sap.ui.define([], function () {
	"use strict";

	var ContainerRenderer = {};

	ContainerRenderer.render = function (oRenderManager, oContainer) {
		oRenderManager.write("<div");
		if (oContainer.getWidth()) {
			oRenderManager.addStyle("width", oContainer.getWidth());
		}
		if (oContainer.getHeight()) {
			oRenderManager.addStyle("height", oContainer.getHeight());
		}
		//oRenderManager.addStyle("display", "flex");
		//oRenderManager.addStyle("flex-flow", "row wrap");
		oRenderManager.writeStyles();
		oRenderManager.writeControlData(oContainer);
		oRenderManager.write(">");

		var aItems = oContainer.getItems();
		if (aItems && aItems.length > 0) {
			for (var i = 0; i < aItems.length; i++) {
				aItems[i].addStyleClass("ciconnectContainerItem" + oContainer.getDisplay());
				oRenderManager.renderControl(aItems[i]);
			}
		}

		oRenderManager.write("</div>");
	};

	return ContainerRenderer;
}, true);
sap.ui.define([], function () {
	"use strict";

	var BOControlRenderer = {};

	BOControlRenderer.render = function (oRenderManager, BOControl) {
		oRenderManager.write("<div");
		if (BOControl.getWidth()) {
			oRenderManager.addStyle("width", BOControl.getWidth());
		}
		if (BOControl.getHeight()) {
			oRenderManager.addStyle("height", BOControl.getHeight());
		}
		oRenderManager.writeStyles();
		oRenderManager.writeControlData(BOControl);
		oRenderManager.addClass("jenkinsbo");
		oRenderManager.writeClasses();
		oRenderManager.write(">");
		oRenderManager.write("</div>");
	};
	
	return BOControlRenderer;

}, true);
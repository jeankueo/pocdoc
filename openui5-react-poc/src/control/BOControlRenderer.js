sap.ui.define([], function () {
	"use strict";

	var BOControlRenderer = {};

	BOControlRenderer.render = function (oRenderManager, BOControl) {
		oRenderManager.write("<div");
		oRenderManager.writeControlData(BOControl);
		oRenderManager.write(">");
		oRenderManager.write("</div>");
	};
	
	return BOControlRenderer;

}, true);
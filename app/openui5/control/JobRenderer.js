sap.ui.define([], function () {
	"use strict";

	var JobRenderer = {};

	JobRenderer.render = function (oRenderManager, oPipeline) {
		oRenderManager.write("<div");
		oRenderManager.writeControlData(oPipeline);
		oRenderManager.addStyle("width", "90px");
		oRenderManager.addStyle("height", "90px");
		oRenderManager.addStyle("background-color", "#000");
		oRenderManager.writeStyles();
		oRenderManager.addClass("ciconnectJob");
		oRenderManager.writeClasses();
		oRenderManager.write(">");
		
		// TODO
		
		oRenderManager.write("</div>");
	};

	return JobRenderer;

}, true);

sap.ui.define([], function () {
	"use strict";

	var JobRenderer = {};

	JobRenderer.render = function (oRenderManager, oJob) {
		oRenderManager.write("<div");
		oRenderManager.writeControlData(oJob);
		oRenderManager.addStyle("width", "90px");
		oRenderManager.addStyle("height", "90px");
		oRenderManager.addStyle("background-color", "#000");
		oRenderManager.writeStyles();
		oRenderManager.addClass("ciconnectJob");
		oRenderManager.writeClasses();
		oRenderManager.write(">");
		
		oRenderManager.write("<p>" + oJob.getId() + "</p>");
		
		oRenderManager.write("</div>");
	};

	return JobRenderer;

}, true);

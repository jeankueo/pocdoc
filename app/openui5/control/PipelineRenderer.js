sap.ui.define([], function () {
	"use strict";

	var PipelineRenderer = {};

	PipelineRenderer.render = function (oRenderManager, oPipeline) {
		oRenderManager.write("<div");
		oRenderManager.writeControlData(oPipeline);
		oRenderManager.addStyle("width", "300px");
		oRenderManager.addStyle("height", "100px");
		oRenderManager.writeStyles();
		oRenderManager.addClass("ciconnectPipeline");
		oRenderManager.writeClasses();
		oRenderManager.write(">");
		
		// TODO
		
		oRenderManager.write("</div>");
	};

	return PipelineRenderer;

}, true);

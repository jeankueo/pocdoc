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
		
		oRenderManager.write("<p>" + oPipeline.getId() + "</p>");
		var aJob = oPipeline.getJobs();
		if (aJob) {
			for (var i = 0; i < aJob.length; i++) {
				oRenderManager.renderControl(aJob[i]);
			}
		}
		
		oRenderManager.write("</div>");
	};

	return PipelineRenderer;

}, true);

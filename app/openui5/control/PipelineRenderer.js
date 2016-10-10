sap.ui.define([], function () {
	"use strict";

	var PipelineRenderer = {};

	PipelineRenderer.render = function (oRenderManager, oPipeline) {
		var aJobs = oPipeline.getJobs();
		
		var nWidthSpan = aJobs ? aJobs.length : 1,
			nHeightSpan = oPipeline.getType() === sap.ciconnect.control.PipelineType.Mixed ? 2 : 1;
		
		oRenderManager.write("<div");
		oRenderManager.writeControlData(oPipeline);
		oRenderManager.addStyle("width",  nWidthSpan * 80 + "px");
		oRenderManager.addStyle("height", nHeightSpan * 50 + "px");
		oRenderManager.writeStyles();
		oRenderManager.addClass("ciconnectPipeline");
		oRenderManager.writeClasses();
		oRenderManager.write(">");
		
		
		oRenderManager.write("</div>");
	};

	return PipelineRenderer;

}, true);

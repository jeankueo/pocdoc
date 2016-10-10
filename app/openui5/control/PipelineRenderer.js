sap.ui.define([], function () {
	"use strict";

	var PipelineRenderer = {};

	PipelineRenderer.render = function (oRenderManager, oPipeline) {
		var aJobs = oPipeline.getJobs();
		
		var nWidthSpan = aJobs ? aJobs.length : 1,
			nHeightSpan = oPipeline.getType() === sap.ciconnect.control.PipelineType.Mixed ? 2 : 1,
			sJobHeight = oPipeline.getJobHeight(),
			sJobWidth = oPipeline.getJobWidth();
		
		oRenderManager.write("<div");
		oRenderManager.writeControlData(oPipeline);
		oRenderManager.addStyle("width", nWidthSpan * sJobWidth + "px");
		oRenderManager.addStyle("height", nHeightSpan * sJobHeight + "px");
		oRenderManager.writeStyles();
		oRenderManager.addClass("ciconnectPipelineDiv");
		oRenderManager.writeClasses();
		oRenderManager.write(">");
		
		oRenderManager.write("<svg id='" + oPipeline.getId() + "-svg' width='100%' height='100%'>");
		
		// TODO remove
		oRenderManager.write("<rect");
		oRenderManager.addClass("ciconnectPipelineSvgFrame");
		oRenderManager.writeClasses();
		oRenderManager.write("></rect>");
		// TODO remove
		
		oRenderManager.write("</svg>");
		
		oRenderManager.write("</div>");
	};

	return PipelineRenderer;

}, true);

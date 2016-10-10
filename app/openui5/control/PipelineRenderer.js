sap.ui.define([], function () {
	"use strict";

	var PipelineRenderer = {};

	PipelineRenderer.render = function (oRenderManager, oPipeline) {
		var aJobs = oPipeline.getJobs();
		
		var nWidthSpan = aJobs ? aJobs.length : 1,
			nHeightSpan = oPipeline.getType() === sap.ciconnect.control.PipelineType.Mixed ? 2 : 1,
			sTileHeight = oPipeline.getTileHeight(),
			sTileWidth = oPipeline.getTileWidth();
		
		oRenderManager.write("<div");
		oRenderManager.writeControlData(oPipeline);
		oRenderManager.addStyle("width", nWidthSpan * sTileWidth + "px");
		oRenderManager.addStyle("height", nHeightSpan * sTileHeight + "px");
		oRenderManager.writeStyles();
		oRenderManager.addClass("ciconnectPipelineDiv");
		oRenderManager.writeClasses();
		oRenderManager.write(">");
		
		oRenderManager.write("<svg id='" + oPipeline.getId() + "-svg' width='100%' height='100%'>");
		
		oRenderManager.write("<rect");
		oRenderManager.addClass("ciconnectPipelineSvgFrame");
		oRenderManager.writeClasses();
		oRenderManager.write("></rect>");
		
		oRenderManager.write("</svg>");
		
		oRenderManager.write("</div>");
	};

	return PipelineRenderer;

}, true);

sap.ui.define([], function () {
	"use strict";

	var PipelineRenderer = {};

	PipelineRenderer.render = function (oRenderManager, oPipeline) {
		var aJobs = oPipeline.getJobs();
		
		var iWidthSpan = aJobs ? aJobs.length : 1,
			iHeightSpan = oPipeline.getType() === sap.ciconnect.control.PipelineType.Mixed ? 2 : 1,
			iTileHeight = oPipeline.getTileHeight(),
			iTileWidth = oPipeline.getTileWidth(),
			iPadding = oPipeline.getPadding();
		
		oRenderManager.write("<div");
		oRenderManager.writeControlData(oPipeline);
		oRenderManager.addStyle("width", (iWidthSpan * iTileWidth + iPadding * 2) + "px");
		oRenderManager.addStyle("height", (iHeightSpan * iTileHeight + iPadding * 2) + "px");
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

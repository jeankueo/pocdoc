sap.ui.define([], function () {
	"use strict";

	var PipelineRenderer = {};

	PipelineRenderer.render = function (oRenderManager, oPipeline) {
		oRenderManager.write("<div");
		oRenderManager.writeControlData(oPipeline);
		oRenderManager.write(">");
		
		this.renderTitle(oRenderManager, oPipeline);
		this.renderSvg(oRenderManager, oPipeline);
		
		oRenderManager.write("</div>");
	};
	
	PipelineRenderer.renderTitle = function (oRenderManager, oPipeline) {
		if (oPipeline.getTitle()) {
			oRenderManager.renderControl(oPipeline.getTitle());
		}
	};
	
	PipelineRenderer.renderSvg = function (oRenderManager, oPipeline) {
		var aJobs = oPipeline.getJobs(),
			iWidthSpan = aJobs ? aJobs.length : 1,
			iHeightSpan = (oPipeline.getType() === sap.ciconnect.control.PipelineType.Mixed) && oPipeline.getEnableTwoRow() ? 2 : 1,
			iTileHeight = oPipeline.getTileHeight(),
			iTileWidth = oPipeline.getTileWidth(),
			iPadding = oPipeline.getPadding();
		
		oRenderManager.write("<div");
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

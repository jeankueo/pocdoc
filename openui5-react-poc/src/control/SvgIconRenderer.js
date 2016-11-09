sap.ui.define([], function () {
	"use strict";

	var SvgIconRenderer = {};

	SvgIconRenderer.render = function (oRenderManager, oSvgIcon) {
		
		oRenderManager.write("<div"); // use div to impl tooltip
		oRenderManager.writeControlData(oSvgIcon);
		if (oSvgIcon.getTooltip()) {
			oRenderManager.write("title='" + oSvgIcon.getTooltip() + "'");
		}
		oRenderManager.write(">");
		
		oRenderManager.write("<svg"); // use class name to define which svg file to use
		oRenderManager.addClass("ciConnectSvg" + oSvgIcon.getName());
		oRenderManager.writeClasses();

		if (oSvgIcon.getWidth() && oSvgIcon.getHeight()) { // if size specified, write style inline, which will overwrite css if exists
			oRenderManager.addStyle("width",oSvgIcon.getWidth());
			oRenderManager.addStyle("height",oSvgIcon.getHeight());
			oRenderManager.addStyle("background-size", oSvgIcon.getWidth() + " " + oSvgIcon.getHeight());
			oRenderManager.writeStyles();
		}

		oRenderManager.write(">");
		oRenderManager.write("</svg>");
		oRenderManager.write("</div>");
	};

	return SvgIconRenderer;

}, true);

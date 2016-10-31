sap.ui.define([], function () {
	"use strict";

	var RepositoryIconRenderer = {};

	RepositoryIconRenderer.render = function (oRenderManager, oRepositoryIcon) {
		
		oRenderManager.write("<div");
		oRenderManager.writeControlData(oPipeline);
		oRenderManager.addStyle("width", oRepositoryIcon.getWidth());
		oRenderManager.addStyle("height", oRepositoryIcon.getHeight());
		oRenderManager.write(">");
		
		switch(oRepositoryIcon.getName()){
		case sap.ciconnect.control.RepositoryIconName.Github:
			this.renderGithub(oRenderManager, oRepositoryIcon);
			break;
		case sap.ciconnect.control.RepositoryIconName.Git:
			this.renderGit(oRenderManager, oRepositoryIcon);
			break;
		case sap.ciconnect.control.RepositoryIconName.Gerrit:
			this.renderGerrit(oRenderManager, oRepositoryIcon);
			break;
		case sap.ciconnect.control.RepositoryIconName.GitGerrit:
			this.renderGit(oRenderManager, oRepositoryIcon);
			this.renderGerrit(oRenderManager, oRepositoryIcon);
			break;
		default:
			break;
		}
		
		oRenderManager.write("</div>");
	};
	
	RepositoryIconRenderer.renderGithub = function (oRenderManager, oRepositoryIcon) {
		
	};
	
	RepositoryIconRenderer.renderGit = function (oRenderManager, oRepositoryIcon) {
		
	};
	
	RepositoryIconRenderer.renderGerrit = function (oRenderManager, oRepositoryIcon) {
		
	};

	return RepositoryIconRenderer;

}, true);

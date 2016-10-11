sap.ciconnect.control = sap.ciconnect.control || {};

sap.ciconnect.control.RepositoryIconName = {
	Github: "Github",
	Git: "Git",
	Gerrit: "Gerrit",
	GitGerrit: "GitGerrit"
};

sap.ui.define([
	"sap/ui/core/Control"
], function (Control) {
	"use strict";
	
	var RepositoryIcon = Control.extend("sap.ciconnect.control.RepositoryIcon", {
		metadata: {
			properties: {
				width: {type: "sap.ui.core.CSSSize", defaultValue: "40px"},
				height: {type: "sap.ui.core.CSSSize", defaultValue: "40px"},
				name: {type: "string", defaultValue: sap.ciconnect.control.RepositoryIconName.Github}
			}
		}
	})
}, true);
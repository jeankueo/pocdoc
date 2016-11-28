sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var pipeline = BlockBase.extend("sap.ciconnect.view.repoblock.pipeline", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "sap.ciconnect.view.repoblock.pipeline",
					type: "XML"
				},
				Expanded: {
					viewName: "sap.ciconnect.view.repoblock.pipeline",
					type: "XML"
				}
			}
		}
	});

	return pipeline;
}, true);

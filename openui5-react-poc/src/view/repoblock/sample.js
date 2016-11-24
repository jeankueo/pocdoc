sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var sample = BlockBase.extend("sap.ciconnect.view.repoblock.sample", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "sap.ciconnect.view.repoblock.sample",
					type: "XML"
				},
				Expanded: {
					viewName: "sap.ciconnect.view.repoblock.sample",
					type: "XML"
				}
			}
		}
	});

	return sample;
}, true);

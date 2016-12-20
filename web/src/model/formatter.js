sap.ui.define([], function () {
	"use strict";
	return {
		pipeLineAssignedRepoState: function (aRepo) {
			if (!aRepo) {
				return "Error";
			} else if (aRepo.length === 0) {
				return "Error";
			} else if (aRepo.length < 3) {
				return "Warning";
			} else {
				return "Success";
			}
		},

		pipelineTileWidth: function (oAbstract) {
			if (!oAbstract || !oAbstract.stages || oAbstract.stages.length < 5) {
				return "160px";
			} else {
				return (160 + 40 * (oAbstract.stages.length - 4)) + "px";
			}
		}
	};
})
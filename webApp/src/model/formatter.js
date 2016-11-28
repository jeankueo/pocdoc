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
		}
	};
})
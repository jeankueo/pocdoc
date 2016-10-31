sap.ui.define([], function () {
	"use strict";
	return {
		pipeLineAssignedRepoState: function (iRepoCount) {
			if (iRepoCount === 0) {
				return "Error";
			} else if (iRepoCount < 5) {
				return "Warning";
			} else {
				return "Success";
			}
		}
	};
})
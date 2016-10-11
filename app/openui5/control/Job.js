sap.ciconnect.control = sap.ciconnect.control || {};

sap.ciconnect.control.JobType = {
	Central: "central",
	Local: "local"
};

sap.ciconnect.control.JobGoal = {
	Build: "BLD",
	Versioning: "VER",
	Validate: "VAL",
	Staging: "STG",
	Promote: "PRM",
	Deploy: "DEP",
	Other: "OTH"
};

sap.ciconnect.control.JobStatus = {
	Waiting: "Waiting",
	Processing: "Processing",
	Succeeded: "Succeeded",
	Failed: "Failed"
};

sap.ciconnect.control.JobStyle = {
	BackSlashPattern: {
		d: "M -1 3 l 2 2 M 0 0 l 4 4 M 3 -1 l 2,2",
		height: 4,
		width: 4
	},
	SlashPattern: {
		d: "M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2",
		height: 4,
		width: 4
	},
	ChevronWithTextAbove: {
		d: "M 0 0 h 15 l 5 5 l -5 5 h -15 l 5 -5 z",
		height: 10,
		width: 20,
		xBias: 0,
		yBias: 6,
		fontXBias: 5,
		fontYBias: 2
	}
};

sap.ui.define([
	"sap/ui/core/Element"
], function (Element) {
	var Job = Element.extend("sap.ciconnect.control.Job", {
		metadata: {
			properties: {
				type: {type: "string", defaultValue: sap.ciconnect.control.JobType.Central},
				goal: {type: "string", defaultValue: sap.ciconnect.control.JobGoal.Build},
				status: {type: "string", defaultValue: sap.ciconnect.control.JobStatus.Waiting}
			}
		}
	});
	
	return Job;
}, true);
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
	Chevron: {
		d: "M 0 0 h 15 l 5 5 l -5 5 h -15 l 5 -5 z",
		height: 10,
		width: 20
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
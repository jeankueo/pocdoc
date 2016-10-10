sap.ciconnect.control = sap.ciconnect.control || {};

sap.ciconnect.control.JobType = {
	Central: "central service",
	Local: "local team Jenkins"
};

sap.ciconnect.control.JobGoal = {
	Build: "Build",
	Validate: "Validate",
	Deploy: "Deploy",
	Other: "Other"
};

sap.ciconnect.control.JobStatus = {
	Waiting: "Waiting",
	Processing: "Processing",
	Finished: "Finished"
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
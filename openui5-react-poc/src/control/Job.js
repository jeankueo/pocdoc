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
	Failed: "Failed",
	None: "None"
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
		d: "M0,0 h15 l5,5 l-5,5 h-15 l5,-5 z",
		height: 10,
		width: 20,
		padding: 2,
		fontSize: 5
	},
	RoundChevronWithTextAbove: {
		d: "M0,0 h15 q12,5,0,10 h-15 q12,-5,0,-10 z",
		height: 10,
		width: 20,
		padding: 2,
		fontSize: 5
	},
	PipeWithTextAbove: {
		d: "M0,0 h2 l2,2 h10 l2,-2 h2 v10 h-2 l-2,-2 h-10 l-2,2 h-2 z",
		height: 10,
		width: 20,
		padding: 2,
		fontSize: 5
	},
	CircleWithTextAbove: {
		d: "M8,0 a4,4 0 1 0 0.00001,0 z",
		height: 10,
		width: 20,
		padding: 2,
		fontSize: 5
	}
};

sap.ui.define([
	"sap/ui/core/Element"
], function (Element) {
	"use strict";
	
	var Job = Element.extend("sap.ciconnect.control.Job", {
		metadata: {
			properties: {
				type: {type: "string", defaultValue: sap.ciconnect.control.JobType.Central},
				goal: {type: "string", defaultValue: sap.ciconnect.control.JobGoal.Build},
				status: {type: "string", defaultValue: sap.ciconnect.control.JobStatus.None},
				shortTooltip: {type: "string", defaultValue: "hello"},
				serviceLink: {type: "string"}
			}
		}
	});
	
	return Job;
}, true);
/**
 * Job types
 *
 * @enum {string}
 * @public
 */
sap.ciconnect.control.JobType = {
	Central: "central service",
	Local: "local team Jenkins"
};


sap.ui.define([
	"sap/ui/core/Control"
], function (Control) {
	var Job = Control.extend("sap.ciconnect.control.Job", {
		metadata: {
			properties: {
				type: {type: "string", defaultValue: sap.ciconnect.control.JobType.Central}
			}
		}
	});
	
	return Job;
}, true);
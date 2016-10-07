/**
 * Pipeline types
 *
 * @enum {string}
 * @public
 */
sap.ciconnect.control.PipelineType = {
	CentralOnly: "central service only",
	LocalOnly: "local team Jenkins only",
	Mixed: "across local Jenkins and central services"
};


sap.ui.define([
	"sap/ui/core/Control"
], function (Control) {
	var Pipeline = Control.extend("sap.ciconnect.control.Pipeline", {
		metadata: {
			properties: {
				type: {type: "string", defaultValue: sap.ciconnect.control.PipelineType.CentralOnly}
			},
			aggregations: {
				jobs: {type: "sap.ciconnect.control.Job", multiple: true, bindable: true, visibility: "public"}
			}
		}
	});
	
	return Pipeline;
}, true);
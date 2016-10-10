sap.ciconnect.control = sap.ciconnect.control || {};

sap.ciconnect.control.PipelineType = {
	CentralOnly: "centralOnly",
	LocalOnly: "localOnly",
	Mixed: "mixed"
};

sap.ui.define([
	"sap/ui/core/Control", "./Job", "sap/ui/thirdparty/d3"
], function (Control, Job) {
	var Pipeline = Control.extend("sap.ciconnect.control.Pipeline", {
		metadata: {
			properties: {
				jobWidth: {type: "int", defaultValue: 80},
				jobHeight: {type: "int", defaultValue: 50},
				type: {type: "string", defaultValue: sap.ciconnect.control.PipelineType.CentralOnly}
			},
			aggregations: {
				jobs: {type: "sap.ciconnect.control.Job", multiple: true, visibility: "public",
					singularName: "job", bindable: "bindable"}
			}
		}
	});
	
	Pipeline.prototype.onAfterRendering = function () {
		var $svg = d3.select("#" + this.getId() + "-svg");
		this._drawDefs($svg);
		this._drawJobs($svg);
		this._drawConnection($svg);
	};
	
	Pipeline.prototype._drawDefs = function ($svg) {
		//$svg.append("<def>");
	};
	
	Pipeline.prototype._drawJobs = function ($svg) {
		var aJobData = this._genData(this.getJobs()),
			iJobWidth = this.getJobWidth(),
			iJobHeight = this.getJobHeight(),
			bMixed = this.getType() === sap.ciconnect.control.PipelineType.Mixed;
		
		$jobs = $svg.selectAll(".ciconnectJobChevron")
			.data(aJobData);
		
		$jobs.enter().append("path")
			.classed("ciconnectJobStatusFinished", function (d) {
				return !d.status || (d.status === "Finished");
			})
			.classed("ciconnectJobStatusInprocess", function (d) {
				return d.status === "Processing";
			})
			.classed("ciconnectJobStatusWaiting", function (d) {
				return d.status === "Waiting";
			})
			.classed("ciConnectJobTypeCentral", function (d) {
				return d.type === sap.ciconnect.control.JobType.Central;
			})
			.classed("ciConnectJobTypeLocal", function (d) {
				return d.type === sap.ciconnect.control.JobType.Local;
			})
			.attr("d", "M 0 0 h 15 l 5 5 l -5 5 h -15 l 5 -5 z") // w20h10
			.attr("transform", function (d, i) {
				var tx = i * iJobWidth,
					ty = bMixed && (d.type === sap.ciconnect.control.JobType.Local) ? iJobHeight : 0;
				var sRetVal = "translate(" + tx + "," + ty + ")";
				return sRetVal;
			});
		
		$jobs.exit().remove();
	};
	
	Pipeline.prototype._drawConnection = function ($svg) {
		//$svg.append("<path>");
	};
	
	Pipeline.prototype._genData = function (aData) {
		var aRetVal = [],
			oEntry;
		
		if (aData) {
			for (var i = 0; i < aData.length; i++) {
				oEntry = {};
				for (var j in aData[i].mProperties) {
					oEntry[j] = aData[i].mProperties[j];
				}
				aRetVal.push(oEntry);
			}
		}
		return aRetVal;
	};
	
	return Pipeline;
}, true);
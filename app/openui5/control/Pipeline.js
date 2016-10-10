sap.ciconnect.control = sap.ciconnect.control || {};

sap.ciconnect.control.PipelineType = {
	CentralOnly: "centralOnly",
	LocalOnly: "localOnly",
	Mixed: "mixed"
};

sap.ui.define([
	"sap/ui/core/Control", "sap/ui/thirdparty/d3"
], function (Control) {
	var Pipeline = Control.extend("sap.ciconnect.control.Pipeline", {
		metadata: {
			properties: {
				jobWidth: {type: "sap.ui.core.CSSSize", defaultValue: "80px"},
				jobHeight: {type: "sap.ui.core.CSSSize", defaultValue: "50px"},
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
		var aJobData = this._genData(this.getJobs());
		
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
			.attr("d", "M 6 5 h 15 l 7 5 l -7 5 h -15 l 4 -5 z")
			.attr("transform", function (d, i) {
				return "";
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
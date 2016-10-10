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
				tileWidth: {type: "int", defaultValue: 50},
				tileHeight: {type: "int", defaultValue: 25},
				padding: {type: "int", defaultValue: 5},
				
				jobStyle: {type: "string", defaultValue: sap.ciconnect.control.JobStyle.Chevron},
				
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
			iTileWidth = this.getTileWidth(),
			iTileHeight = this.getTileHeight(),
			iPadding = this.getPadding(),
			bMixed = this.getType() === sap.ciconnect.control.PipelineType.Mixed,
			oJobStyle = this.getJobStyle(),
			fScaleFactor = Math.min(iTileWidth/oJobStyle.width, iTileHeight/oJobStyle.height);
		
		$jobs = $svg.selectAll(".ciconnectJobChevron")
			.data(aJobData);
		
		$jobs.enter().append("path")
			.classed("ciconnectJobStatusFinished", function (d) {
				return !d.status ||
					d.status === sap.ciconnect.control.JobStatus.Succeeded ||
					d.status === sap.ciconnect.control.JobStatus.Failed;
			})
			.classed("ciconnectJobStatusInprocess", function (d) {
				return d.status === sap.ciconnect.control.JobStatus.Processing;
			})
			.classed("ciconnectJobStatusWaiting", function (d) {
				return d.status === sap.ciconnect.control.JobStatus.Waiting;
			})
			.classed("ciConnectJobTypeCentral", function (d) {
				return d.type === sap.ciconnect.control.JobType.Central;
			})
			.classed("ciConnectJobTypeLocal", function (d) {
				return d.type === sap.ciconnect.control.JobType.Local;
			})
			.attr("d", oJobStyle.d)
			.attr("transform", function (d, i) {
				var sRetVal = "",
					tx = i * iTileWidth + iPadding,
					ty = (bMixed && (d.type === sap.ciconnect.control.JobType.Local) ? iTileHeight : 0) + iPadding;
				
				sRetVal += "translate(" + tx + "," + ty + ")";
				sRetVal += " scale(" + fScaleFactor + ")";
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
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
		//TODO
	};
	
	Pipeline.prototype._drawJobs = function ($svg) {
		var aJobData = this._genData(this.getJobs());
		
		var $jobGroup = $svg.selectAll("g")
			.data(aJobData);
		$jobGroup.enter().append("g");
		
		this._drawJobPath($jobGroup);
		this._drawJobText($jobGroup);
		
		$jobGroup.exit().remove();
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
	
	Pipeline.prototype._drawJobPath = function ($jobGroup) {
		var iTileWidth = this.getTileWidth(),
			iTileHeight = this.getTileHeight(),
			iPadding = this.getPadding(),
			bMixed = this.getType() === sap.ciconnect.control.PipelineType.Mixed,
			oJobStyle = this.getJobStyle(),
			fScaleFactor = Math.min(iTileWidth/oJobStyle.width, iTileHeight/oJobStyle.height);
		
		var $jobPath = $jobGroup.selectAll("path").data(function(d, i){
			return [{data: d, index: i}];
		});
		$jobPath.enter().append("path");
		$jobPath.classed("ciconnectJobPathStatusFinished", function (d) {
				return !d.data.status ||
					d.data.status === sap.ciconnect.control.JobStatus.Succeeded ||
					d.data.status === sap.ciconnect.control.JobStatus.Failed;
			})
			.classed("ciconnectJobPathStatusInprocess", function (d) {
				return d.data.status === sap.ciconnect.control.JobStatus.Processing;
			})
			.classed("ciconnectJobPathStatusWaiting", function (d) {
				return d.data.status === sap.ciconnect.control.JobStatus.Waiting;
			})
			.classed("ciConnectJobPathTypeCentral", function (d) {
				return d.data.type === sap.ciconnect.control.JobType.Central;
			})
			.classed("ciConnectJobPathTypeLocal", function (d) {
				return d.data.type === sap.ciconnect.control.JobType.Local;
			})
			.attr("d", oJobStyle.d)
			.attr("transform", function (d) {
				var sRetVal = "",
					tx = d.index * iTileWidth + iPadding,
					ty = (bMixed && (d.data.type === sap.ciconnect.control.JobType.Local) ? iTileHeight : 0) + iPadding;
				
				sRetVal += "translate(" + tx + "," + ty + ")";
				sRetVal += " scale(" + fScaleFactor + ")";
				return sRetVal;
			});
	};
	
	Pipeline.prototype._drawJobText = function ($jobGroup) {
		//TODO
	};
	
	Pipeline.prototype._drawConnection = function ($svg) {
		//TODO
	};
	
	return Pipeline;
}, true);
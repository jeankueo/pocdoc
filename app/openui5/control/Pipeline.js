sap.ciconnect.control = sap.ciconnect.control || {};

sap.ciconnect.control.PipelineType = {
	CentralOnly: "centralOnly",
	LocalOnly: "localOnly",
	Mixed: "mixed"
};

sap.ui.define([
	"sap/ui/core/Control", "./Job", "sap/ui/thirdparty/d3"
], function (Control, Job) {
	"use strict";
	
	var Pipeline = Control.extend("sap.ciconnect.control.Pipeline", {
		metadata: {
			properties: {
				tileWidth: {type: "int", defaultValue: 50},
				tileHeight: {type: "int", defaultValue: 25},
				padding: {type: "int", defaultValue: 10},
				jobStyle: {type: "object", defaultValue: sap.ciconnect.control.JobStyle.ChevronWithTextAbove},
				type: {type: "string", defaultValue: sap.ciconnect.control.PipelineType.CentralOnly},
				enableTwoRow: {type: "boolean", defaultValue: false},
				enableBackground: {type: "boolean", defaultValue: false}
			},
			aggregations: {
				title: {type: "sap.m.Text", multiple: false, visibility: "public", bindable: "bindable"},
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
		var $defs = $svg.append("defs");
		this._drawPattern($defs);
	};
	
	Pipeline.prototype._drawPattern = function ($defs) {
		var aPatterData = [{
			type: "Central",
			pattern: sap.ciconnect.control.JobStyle.BackSlashPattern
		}, {
			type: "Local",
			pattern: sap.ciconnect.control.JobStyle.BackSlashPattern
		}];
		
		$defs.selectAll("pattern")
			.data(aPatterData)
			.enter()
			.append("pattern")
			.attr("id", function (d) {
				return "inProcess" + d.type;
			}).attr("patternUnits", "userSpaceOnUse")
			.attr("x", 0)
			.attr("y", 0)
			.attr("width", function (d) {
				return d.pattern.width;
			}).attr("height", function (d) {
				return d.pattern.height
			}).append("path")
			.attr("d", function (d) {
				return d.pattern.d;
			}).classed("ciConnectJobPathTypeCentral", function (d) {
				return d.type === "Central";
			}).classed("ciConnectJobPathTypeLocal", function (d) {
				return d.type === "Local";
			});
	};
	
	Pipeline.prototype._drawJobs = function ($svg) {
		var aJobData = this._genData(this.getJobs());
		
		var $jobGroup = $svg.selectAll("g")
			.data(aJobData);
		$jobGroup.enter().append("g");
		
		this._drawTooltip($jobGroup);
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
	
	Pipeline.prototype._drawTooltip = function ($jobGroup) {
		
	};
	
	Pipeline.prototype._drawJobPath = function ($jobGroup) {
		var iTileWidth = this.getTileWidth(),
			iTileHeight = this.getTileHeight(),
			iPadding = this.getPadding(),
			bTwoRow = (this.getType() === sap.ciconnect.control.PipelineType.Mixed) && this.getEnableTwoRow(),
			oJobStyle = this.getJobStyle(),
			fScaleFactor = Math.min(iTileWidth/oJobStyle.width, iTileHeight/oJobStyle.height);
		
		var $jobPath = $jobGroup.selectAll("path").data(function(d, i){
			return [{data: d, index: i}];
		});
		$jobPath.enter().append("path");
		$jobPath
			.classed("ciconnectJobPathStatusInprocessCentral", function (d) {
				return d.data.status === sap.ciconnect.control.JobStatus.Processing
					&& d.data.type === sap.ciconnect.control.JobType.Central;
			})
			.classed("ciconnectJobPathStatusInprocessLocal", function (d) {
				return d.data.status === sap.ciconnect.control.JobStatus.Processing
					&& d.data.type === sap.ciconnect.control.JobType.Local;
			})
			.classed("ciConnectJobPathTypeCentral", function (d) {
				return d.data.type === sap.ciconnect.control.JobType.Central;
			})
			.classed("ciConnectJobPathTypeLocal", function (d) {
				return d.data.type === sap.ciconnect.control.JobType.Local;
			})
			.classed("ciconnectJobPathStatusFinished", function (d) {
				return d.data.status === sap.ciconnect.control.JobStatus.Succeeded ||
					d.data.status === sap.ciconnect.control.JobStatus.Failed;
			})
			.classed("ciconnectJobPathStatusNone", function (d) {
				return !d.data.status ||
					d.data.status === sap.ciconnect.control.JobStatus.None;
			})
			.classed("ciconnectJobPathStatusWaiting", function (d) {
				return d.data.status === sap.ciconnect.control.JobStatus.Waiting;
			})
			
			.attr("d", oJobStyle.d)
			.attr("transform", function (d) {
				var sRetVal = "",
					tx = d.index * iTileWidth + iPadding + oJobStyle.xBias,
					ty = (bTwoRow && (d.data.type === sap.ciconnect.control.JobType.Local) ? iTileHeight : 0) +
						iPadding + oJobStyle.yBias;
				
				sRetVal += "translate(" + tx + "," + ty + ")";
				sRetVal += " scale(" + fScaleFactor + ")";
				return sRetVal;
			});
	};
	
	Pipeline.prototype._drawJobText = function ($jobGroup) {
		var iTileWidth = this.getTileWidth(),
			iTileHeight = this.getTileHeight(),
			iPadding = this.getPadding(),
			bTwoRow = (this.getType() === sap.ciconnect.control.PipelineType.Mixed) && this.getEnableTwoRow(),
			oJobStyle = this.getJobStyle();
		
		var $jobText = $jobGroup.selectAll("text").data(function(d, i){
			return [{data: d, index: i}];
		});
		$jobText.enter().append("text");
		$jobText.classed("ciConnectJobText", true)
			.classed("ciConnectJobPathTypeCentral", function (d) {
				return d.data.type === sap.ciconnect.control.JobType.Central;
			})
			.classed("ciConnectJobPathTypeLocal", function (d) {
				return d.data.type === sap.ciconnect.control.JobType.Local;
			})
			.text(function (d) {
				return d.data.goal;
			})
			.attr("transform", function (d) {
				var sRetVal = "",
					tx = d.index * iTileWidth + iPadding + oJobStyle.fontXBias,
					ty = (bTwoRow && (d.data.type === sap.ciconnect.control.JobType.Local) ? iTileHeight : 0) +
						iPadding + oJobStyle.fontYBias;
				
				sRetVal += "translate(" + tx + "," + ty + ")";
				return sRetVal;
			});
	};
	
	Pipeline.prototype._drawConnection = function ($svg) {
		//TODO
	};
	
	return Pipeline;
}, true);
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
				padding: {type: "int", defaultValue: 7},
				jobStyle: {type: "string", defaultValue: "ChevronWithTextAbove"},
				type: {type: "string", defaultValue: sap.ciconnect.control.PipelineType.CentralOnly},
				enableText: {type: "boolean", defaultValue: true},
				enableTwoRow: {type: "boolean", defaultValue: false},
				enableConnection: {type: "boolean", defaultValue: false},
				enableBackground: {type: "boolean", defaultValue: false},
				titleFirst: {type: "boolean", defaultValue: true}
			},
			aggregations: {
				title: {type: "sap.m.Label", multiple: false, visibility: "public", bindable: "bindable"},
				jobs: {type: "sap.ciconnect.control.Job", multiple: true, visibility: "public",
					singularName: "job", bindable: "bindable"}
			}
		}
	});
	
	Pipeline.prototype.onAfterRendering = function () {
		var $svg = d3.select("#" + this.getId() + "-svg");
		this._drawDefs($svg);
		if (this.getEnableConnection()) {
			this._drawConnection($svg);
		}
		this._drawJobs($svg);
	};
	
	Pipeline.prototype._drawDefs = function ($svg) {
		var $defs = $svg.append("defs");
		this._drawPattern($defs);
	};
	
	Pipeline.prototype._drawPattern = function ($defs) {
		var sPipelineId = this.getId(),
			aPatterData = [{
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
				return sPipelineId + "InProcess" + d.type;
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
		var aJobData = this._genJobData();
		
		var $jobGroup = $svg.selectAll(".job")
			.data(aJobData);
		$jobGroup.enter().append("a")
			.classed("job", true);
		
		$jobGroup.attr("xlink:href", function (d) {
			if (d.serviceLink) {
				return d.serviceLink;
			}
		}).attr("target", "_blank")
		
		this._drawTooltip($jobGroup);
		this._drawJobPath($jobGroup);
		if (this.getEnableText()) {
			this._drawJobText($jobGroup);
		}

		$jobGroup.exit().remove();
	};
	
	Pipeline.prototype._drawTooltip = function ($jobGroup) {
		$jobGroup.append("title")
			.text(function(d) {
				return d.shortTooltip;
			});
	};
	
	Pipeline.prototype._drawJobPath = function ($jobGroup) {
		var iTileWidth = this.getTileWidth(),
			iTileHeight = this.getTileHeight(),
			iPadding = this.getPadding(),
			bTwoRow = (this.getType() === sap.ciconnect.control.PipelineType.Mixed) && this.getEnableTwoRow(),
			oJobStyle = sap.ciconnect.control.JobStyle[this.getJobStyle()],
			fScaleFactor = Math.min(iTileWidth/oJobStyle.width, iTileHeight/oJobStyle.height),
			sPipelineId = this.getId();
		
		var $jobPath = $jobGroup.selectAll("path").data(function(d, i){
			return [{data: d, index: i}];
		});
		$jobPath.enter().append("path");
		$jobPath
			.classed("ciConnectJobPathTypeCentral", function (d) { // initial fill/stroke applied from css
				return d.data.type === sap.ciconnect.control.JobType.Central;
			})
			.classed("ciConnectJobPathTypeLocal", function (d) { // initial fill/stroke applied from css
				return d.data.type === sap.ciconnect.control.JobType.Local;
			})
			.attr("style", function (d) {
				var sRetVal = "stroke-width:" + 1.5/fScaleFactor + ";";
				
				switch(d.data.status) {
				case sap.ciconnect.control.JobStatus.Processing:
					if (d.data.type === sap.ciconnect.control.JobType.Central) {
						sRetVal += "fill: url(#" + sPipelineId + "InProcessCentral);";
					} else {
						sRetVal += "fill: url(#" + sPipelineId + "InProcessLocal);";
					}
					break;
				case sap.ciconnect.control.JobStatus.Waiting:
					sRetVal += "fill-opacity: 0;"
					sRetVal += "stroke-dasharray:3,1;";
					break;
				case sap.ciconnect.control.JobStatus.None:
					sRetVal += "fill-opacity: 0;";
					break;
				default: // Success or Fail
				} 
				
				return sRetVal;
			})
			.attr("d", oJobStyle.d)
			.attr("transform", function (d) {
				var sRetVal = "",
					tx = d.index * iTileWidth + iPadding + oJobStyle.xBias,
					ty = (bTwoRow && (d.data.type === sap.ciconnect.control.JobType.Local) ? iTileHeight : 0) +
						iPadding + oJobStyle.yBias + oJobStyle.fontSize;
				
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
			oJobStyle = sap.ciconnect.control.JobStyle[this.getJobStyle()],
			fScaleFactor = Math.min(iTileWidth/oJobStyle.width, iTileHeight/oJobStyle.height);
		
		var $jobText = $jobGroup.selectAll("text").data(function(d, i){
			return [{data: d, index: i}];
		});
		$jobText.enter().append("text");
		$jobText
			.classed("ciConnectJobText", function (d) {
				return !d.data.serviceLink;
			})
			.classed("ciConnectJobLink", function (d) {
				return d.data.serviceLink;
			})
			.text(function (d) {
				return d.data.goal;
			})
			.attr("transform", function (d) {
				var sRetVal = "",
					tx = d.index * iTileWidth + iPadding + oJobStyle.fontXBias,
					ty = (bTwoRow && (d.data.type === sap.ciconnect.control.JobType.Local) ? iTileHeight : 0) +
						iPadding + oJobStyle.fontYBias +oJobStyle.fontSize;
				
				sRetVal += "translate(" + tx + "," + ty + ")";
				return sRetVal;
			})
			.attr("font-size", function (d) {
				return oJobStyle.fontSize * fScaleFactor + "px";
			});
	};
	
	Pipeline.prototype._drawConnection = function ($svg) {
		var aConnectionData = this._genConnectionData();
		
		var $connectionGroup = $svg.selectAll(".connection")
			.data(aConnectionData);
		$connectionGroup.enter().append("g")
			.classed("connection", true);
		
		this._drawConnectionPath($connectionGroup);
		
		$connectionGroup.exit().remove();
	};
	
	Pipeline.prototype._drawConnectionPath = function ($connectionGroup) {
		var iTileWidth = this.getTileWidth(),
			iTileHeight = this.getTileHeight(),
			iPadding = this.getPadding(),
			bTwoRow = (this.getType() === sap.ciconnect.control.PipelineType.Mixed) && this.getEnableTwoRow(),
			oJobStyle = sap.ciconnect.control.JobStyle[this.getJobStyle()],
			fScaleFactor = Math.min(iTileWidth/oJobStyle.width, iTileHeight/oJobStyle.height);
		
		var $connectionPath = $connectionGroup.selectAll("path").data(function(d, i){
			return [{data: d, index: i}];
		});
		$connectionPath.enter().append("path");
		$connectionPath
			.attr("style", function (d) {
				var sRetVal = "stroke-width: 1;";
				sRetVal += "stroke-dasharray:5,5;";
				sRetVal += "stroke-linecap:round;";
				sRetVal += "stroke:#666666;";
				sRetVal += "fill:none;";
				return sRetVal;
			})
			.attr("d", function (d) {
				var sRetVal = "M" + iTileWidth / 2 + ",0 ";
				if (bTwoRow) {
					if (d.data.from.type === d.data.to.type) {
						sRetVal += "h" + iTileWidth;
					} else {
						var fRx = Math.min(10, iTileWidth / 2),
							fRy = Math.min(10, iTileHeight / 2),
							fH = iTileWidth / 2 - fRx,
							fV = iTileHeight / 2 - fRy;
						
						if (d.data.from.type === sap.ciconnect.control.JobType.Local) { // local-global
							sRetVal += "h" + fH +
								" a" + fRx + "," + fRy + " 0 " + "0,0 " + fRx + ",-" + fRy +
								" v-" + 2 * fV +
								" a" + fRx + "," + fRy + " 0 " + "0,1 " + fRx + ",-" + fRy +
								" h" + fH;
						} else { // global-local
							sRetVal += "h" + fH +
								" a" + fRx + "," + fRy + " 0 " + "0,1 " + fRx + "," + fRy +
								" v" + 2 * fV +
								" a" + fRx + "," + fRy + " 0 " + "0,0 " + fRx + "," + fRy +
								" h" + fH;
						}
					} 
				} else {
					sRetVal += "h" + iTileWidth;
				}
				return sRetVal;
			})
			.attr("transform", function (d) {
				var sRetVal = "",
					tx = d.index * iTileWidth,
					ty = (bTwoRow && (d.data.from.type === sap.ciconnect.control.JobType.Local) ? 1.5 : 0.5) * iTileHeight +
						iPadding + oJobStyle.yBias;
				
				sRetVal += "translate(" + tx + "," + ty + ")";
				return sRetVal;
			})
	};
	
	Pipeline.prototype._genJobData = function () {
		var aJob = this.getJobs(),
			that = this;
		
		if (aJob) {
			return aJob.map(function(oCurrent) {
				return that._genDataEntryFromProperties(oCurrent.mProperties);
			});
		}
	};
	
	Pipeline.prototype._genConnectionData = function () {
		var aRetVal = [],
			aJob = this.getJobs(),
			that = this;
		
		if (aJob && aJob.length > 1) {
			aJob.reduce(function(oPrevious, oCurrent) {
				aRetVal.push({
					"from": that._genDataEntryFromProperties(oPrevious.mProperties),
					"to": that._genDataEntryFromProperties(oCurrent.mProperties)
				});
				return oCurrent;
			});
		}
		return aRetVal;
	};
	
	Pipeline.prototype._genDataEntryFromProperties = function (aProperties) {
		var oEntry = {};
		for (var sAttr in aProperties) {
			oEntry[sAttr] = aProperties[sAttr];
		}
		return oEntry;
	};
	
	return Pipeline;
}, true);
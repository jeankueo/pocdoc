sap.ui.define(["sap.ui.Control"], function (Control) {
	"use strict";
	
	var BOControl = Control.extend("", {
		metadata: {
			properties: {
				controlName: {type: "string"}
			}
		}
	});
	
	return BOControl;
}, true);
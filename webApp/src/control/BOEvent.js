sap.ui.define([
	"sap/ui/core/Element"
], function (Element) {
	"use strict";

	var BOEvent = Element.extend("sap.ciconnect.control.BOEvent", {
		metadata: {
			properties: {
				name: {type: "string"}
			},
			events: {
				handle: {
					params: {type: "any"}
				}
			}
		}
	});

	return BOEvent;
}, true);
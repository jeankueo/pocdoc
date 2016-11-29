var mongoose = require("mongoose");

var schema = mongoose.Schema({
	key: {type: String, unique: true, index: true},
	name: String,
	description: String,
	type: {type: String, default: "central"},
	category: String,
	sapPredefined: Boolean,
	reposAssigned: [{
		id: String,
		full_name: String
	}],
	abstract: {
		layout: {
			nodeSpacingH: {type: Number, default: 70},
			nodeSpacingV: {type: Number, default: 15},
			nodeRadius: {type: Number, default: 10}
		},
		stages: [{
			id: String,
			type: String,
			name: String,
			state: String,
			short_desc: String,
			link: {type: String, trim: true, validate: /https/}
		}]
	},
	detail: {
		layout: {
			nodeSpacingH: {type: Number, default: 70},
			nodeSpacingV: {type: Number, default: 15},
			nodeRadius: {type: Number, default: 10}
		},
		stages: [{
			id: String,
			type: String,
			name: String,
			state: String,
			short_desc: String,
			link: {type: String, trim: true, validate: /https/}
		}]
	}
});

var model = mongoose.model("Pipeline", schema);

module.exports = model;
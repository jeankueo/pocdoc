module.exports = {
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
			id: {type: String},
			type: {type: String},
			name: {type: String},
			state: {type: String},
			short_desc: {type: String},
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
			id: {type: String},
			type: {type: String},
			name: {type: String},
			state: {type: String},
			short_desc: {type: String},
			link: {type: String, trim: true, validate: /https/}
		}]
	}
};
var Layout = {
	nodeSpacingH: {
		type: "number",
		default: 70
	},
	nodeSpacingV: {
		type: "number", 
		default: 15
	},
	nodeRadius: {
		type: "number", 
		default: 10
	}
};

var Repo = {
	id: "string",
	full_name: "string"
};

var Stage = {
	id: "string",
	type: "string",
	name: "string",
	state: "string",
	short_desc: "string",
	link: "string"
};

module.exports = {
	name: "pipeline",
	plural: "pipelines",
	base: "PersistedModel",
	idInjection: true,
	options: {
		validateUpsert: true
	},
	properties: {
		key: {
			type: "string",
			required: true
		},
		name: {
			type: "string"
		},
		description: {
			type: "string"
		},
		type: {
			type: "string", 
			default: "central"
		},
		category: {
			type: "string"
		},
		sapPredefined: {
			type: "boolean"
		},
		reposAssigned: [Repo],
		abstract: {
			layout: Layout,
			stages: ["object"]
		},
		detail: {
			layout: Layout,
			stages: ["object"]
		}
	}
};
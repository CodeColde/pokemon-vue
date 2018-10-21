let mongoose = require("mongoose");

let TypeSchema = new mongoose.Schema({
	name: String,
	damage_relations: {
		to: {
			no: [
				{
					name: String
				}
			],
			half: [
				{
					name: String
				}
			],
			double: [
				{
					name: String
				}
			],
			
		}
	},
	colors: {
		light: String,
		normal: String,
		dark: String
	}
});

let Type = mongoose.model("Type", TypeSchema);
module.exports = Type;
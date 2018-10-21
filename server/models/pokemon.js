let mongoose = require("mongoose");

let PokemonSchema = new mongoose.Schema({
	pokedex: {
		national: String
	},
	name: {
		english: String,
		japanese: String,
		french: String,
		german: String,
		korean: String
	},
	data: {
		classification: String,
		height: String,
		weight: String,
		egg: {
			one: String,
			two: String
		},
		abilities:{
			first: String,
			second: String,
			third: String,
			hidden: String
		},
		types: {
			main: String,
			secondary: String
		}
	},
	description: String
});

let Pokemon = mongoose.model("Pokemon", PokemonSchema);
module.exports = Pokemon;
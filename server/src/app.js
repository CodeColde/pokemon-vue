const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

// Some utility variables
const sortUp = 1
const sortDown = -1

// Database connection
mongoose.connect('mongodb://localhost:27017/serebii');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once("open", (callback) => {
	console.log("Connection Successful");
});

// Models
let Pokemon = require("../models/pokemon");
let Types = require("../models/type");

// Bind external services to app
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// Routing here
// Pokemon
	// Get all pokemon
	app.get('/pokemon', (req, res) => {
		Pokemon.find({}, 'pokedex name data description', (error, pokemons) => {
			if (error) { console.log(error); }
			res.send({
				pokemons: pokemons
			})
		}).sort({_id: sortUp})
	})
	// Add new pokemon
	app.post('/pokemon', (req, res) => {
		let db = req.db;
		let pokedex = req.body.pokedex,
			name = req.body.name,
			data = req.body.data,
			description = req.body.description;
		let new_pokemon = new Pokemon({
			pokedex: pokedex,
			name: name,
			data: data,
			description: description
		})

		new_pokemon.save((error) => {
			if (error){
				console.log(error)
			}
			res.send({
				success: true,
				message: "Pokemon saved successfully"
			})
		})
	})
	// Fetch single pokemon
	app.get('/pokemon/:id', (req, res) => {
		let db = req.db;
		Pokemon.findById(req.params.id, 'pokedex name data description', (error, pokemon) => {
			if (error) { console.log(error); }
			res.send(pokemon)
		})
	})
	// Update pokemon
	app.put('/pokemon/:id', (req, res) => {
		let db = req.db;
		Pokemon.findById(req.params.id, 'pokedex name data description', (error, pokemon) =>{
			if (error) {console.log(error); }
			pokemon.pokedex = req.body.pokedex
			pokemon.name = req.body.name
			pokemon.data = req.body.data
			pokemon.description = req.body.description
			pokemon.save((error) => {
				if(error){ console.log(error); }
				res.send({
					success: true
				})
			})
		})
	})
	// Delete Pokemon
	app.delete('/pokemon/:id', (req, res) => {
		let db = req.db;
		Pokemon.remove({
			_id: req.params.id
		}, (error, pokemon) => {
			if (error)
				res.send(err)
			res.send({
				success: true
			})
		})
	})

// Types
	// Get all Types
	app.get('/types', (req, res) => {
		Types.find({}, 'name damage_relations colors', (error, types) => {
			if (error) { console.log(error); }
			res.send({
				types: types
			})
		}).sort({_name: sortUp})
	})
	// Get single type
	app.get('/type/:id', (req, res) => {
		let db = req.db;
		Types.findById(req.params.id, 'name damage_relations colors', (error, type) => {
			if (error) { console.log(error); }
			res.send(type)
		})
	})
	// Add new type
	app.post('/type', (req, res) => {
		let db = req.db;
		let newType = new Types({
			name: req.body.name,
			damage_relations: req.body.damage_relations,
			colors: req.body.colors
		})

		newType.save((error) => {
			if (error){
				console.log(error)
			}
			res.send({
				success: true,
				message: "Type saved successfully"
			})
		})
	})
	// Update type
	app.put('/type/:id', (req, res) => {
		let db = req.db;
		Types.findById(req.params.id, 'name damage_relations colors', (error, type) =>{
			if (error) {console.log(error); }
			type.name = req.body.name
			type.damage_relations = req.body.damage_relations
			type.colors = req.body.colors
			type.save((error) => {
				if(error){ console.log(error); }
				res.send({
					success: true
				})
			})
		})
	})
	// Delete type
	app.delete('/type/:id', (req, res) => {
		let db = req.db;
		Types.remove({
			_id: req.params.id
		}, (error, type) => {
			if (error)
				res.send(err)
			res.send({
				success: true
			})
		})
	})

app.listen(process.env.PORT || 8081)
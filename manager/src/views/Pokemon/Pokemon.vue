<template>
	<div class="pokemon">
		<Navigation />
		<h1>{{ title }}</h1>
		<div class='table-wrap'>
			<div>
				<router-link v-bind:to="{ name: 'NewPokemon' }" class="">Add Pokemon</router-link>
			</div>
		</div>
		<table v-if="pokemons.length > 0">
			<tr>
				<td>Name</td>
				<td width="550">Description</td>
				<td width="100" align="center">Action</td>
			</tr>
			<tr v-for="(pokemon, index) in pokemons">
				<td v-if="pokemon.name">{{ pokemon.name.english }}</td><td v-else>(no name)</td>
				<td>{{ pokemon.description }}</td>
				<td align="center">
					<router-link v-bind:to="{ name: 'EditPokemon', params: { id: pokemon._id } }">Edit</router-link> | <a href="#" @click="deletePokemon(pokemon._id)">Delete</a>
				</td>
			</tr>
		</table>
		<div v-else>
			No pokemon available. Add one with the link above.
		</div>
	</div>
</template>

<script>
	import PokemonService from '../../services/PokemonService'
	import Navigation from "../../components/Navigation"

	export default {
		name: 'Pokemon',
		components: {
			Navigation
		},
		data() {
			return {
				title: "Pokemon",
				pokemons: []
			}
		},
		mounted() {
			this.getPokemon()
		},
		methods: {
			async getPokemon () {
				const response = await PokemonService.fetchPokemon()
				this.pokemons = response.data.pokemons
			},
			async deletePokemon (id) {
				if(confirm("Are you sure you want to delete this pokemon? All relevant data will be erased!")){
					await PokemonService.deletePokemon(id)
					this.$router.push({name: "Pokemon"})
				}
			}
		}
	}
</script>
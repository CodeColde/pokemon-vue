<template>
	<div class="pokemon">
		<h1>All Pokemon</h1>
		<table v-if="pokemons.length > 0">
			<tr>
				<td>Name</td>
			</tr>
			<tr v-for="(pokemon, index) in pokemons">
				<td>
					<router-link v-bind:to="{ name: 'Pokemon', params: { id: pokemon._id } }">
						<span v-if="pokemon.name">{{ pokemon.name.english }}</span>
						<span v-else>(no name)</span>
					</router-link>
				</td>
			</tr>
		</table>
		<div v-else>
			No pokemon available. Add one with the link above.
		</div>
	</div>
</template>

<script>
	import PokemonService from '../services/PokemonService'

	export default {
		name: 'PokemonList',
		data() {
			return {
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
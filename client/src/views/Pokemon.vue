<template>
	<div class="pokemon">
		<div id="nav">
			<router-link to="/">Home</router-link>
		</div>
		<div class="background">
			
		</div>
		<div v-if="data">
			<h1>{{ data.pokedex.national }} {{ data.name.english }}</h1>
			<h2>{{ data.data.classification }}</h2>
			<h3 v-if="data.data.abilities.second && data.data.abilities.third">
				{{ data.data.abilities.first }} - {{ data.data.abilities.second }} - {{ data.data.abilities.third }} - {{ data.data.abilities.hidden }}
			</h3>
			<h3 v-if="data.data.abilities.second && !data.data.abilities.third">
				{{ data.data.abilities.first }} - {{ data.data.abilities.second }} - {{ data.data.abilities.hidden }}
			</h3>
			<h3 v-if="data.data.abilities.first">
				{{ data.data.abilities.first }} - {{ data.data.abilities.hidden }}
			</h3>
			<table>
				<tr>
					<td>{{ data.data.height }}</td>
					<td>{{ data.data.weight }}</td>
				</tr>
				<tr>
					<td v-if="data.data.egg.one">Egg Groups:</td>
					<td v-if="data.data.egg.one">
						{{ data.data.egg.one }}, {{ data.data.egg.two }}
					</td>
					<td v-else>{{ data.data.egg.one }}</td>
				</tr>
			</table>
		</div>
		<div v-else>
			<p>Loading...</p>
		</div>
	</div>
</template>

<script>
	import PokemonService from '../services/PokemonService'

	export default {
		name: 'Pokemon',
		data() {
			return {
				data: ''
			}
		},
		created() {
			this.getPokemon()
		},
		methods: {
			async getPokemon(){
				const response = await PokemonService.getPokemon({
					id: this.$route.params.id
				})
				this.data = response.data
			}
		}
	}
</script>
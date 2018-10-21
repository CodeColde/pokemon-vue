<template>
	<div class="form">
		<div>
			<h2>Base Info</h2>
			<div>
				<h3>Pokedex</h3>
				<div>
					<input type="number" step="1" min="1" name="nationalDex" placeholder="National Dex #" v-model="nationalDex">
				</div>
				<h3>Pokemon Name</h3>
				<div>
					<h4>English</h4>
					<input type="text" name="english" placeholder="english" v-model="englishName">
				</div>
				<div>
					<h4>Japanese</h4>
					<input type="text" name="japanese" placeholder="japanese" v-model="japaneseName">
				</div>
				<div>
					<h4>German</h4>
					<input type="text" name="german" placeholder="german" v-model="germanName">
				</div>
				<div>
					<h4>French</h4>
					<input type="text" name="french" placeholder="french" v-model="frenchName">
				</div>
				<div>
					<h4>Korean</h4>
					<input type="text" name="korean" placeholder="korean" v-model="koreanName">
				</div>
			</div>
			<div>
				<h3>Data</h3>
				<div>
					<h4>Classification</h4>
					<input type="text" name="classification" placeholder="Pokemon Classification" v-model="classification">
				</div>
				<div>
					<h4>Height</h4>
					<input type="number" step="0.01" min="0.00" name="height" placeholder="Height (m)" v-model="height">
				</div>
				<div>
					<h4>Weight</h4>
					<input type="number" step="0.1" min="0.00" name="weight" placeholder="Width (kg)" v-model="weight">
				</div>
				<div>
					<h4>Egg Groups</h4>
					<input type="text" name="egg1" placeholder="Egg Group 1" v-model="egg1">
					<input type="text" name="egg2" placeholder="Egg Group 2" v-model="egg2">
				</div>
				<div>
					<h4>Abilities</h4>
					<input type="text" name="ability1" placeholder="Ability 1" v-model="ability1">
					<input type="text" name="ability2" placeholder="Ability 2" v-model="ability2">
					<input type="text" name="ability3" placeholder="Ability 3" v-model="ability3">
					<h5>Hidden Ability</h5>
					<input type="text" name="hiddenAbility" placeholder="Hidden Ability" v-model="hiddenAbility">
				</div>
				<div>
					<h4>Types</h4>
					<select name="type1" id="type1" v-model="type1">
						<option value="" selected>-- Choose Main Type --</option>
						<option v-for="(type, key) in typeList" :key="key" :value="type.id">{{type.name}}</option>
					</select>
					<select name="type2" id="type2" v-model="type2">
						<option value="" selected>-- Choose Secondary Type --</option>
						<option v-for="(type, key) in typeList" :key="key" :value="type.id">{{type.name}}</option>
					</select>
				</div>
			</div>
		</div>
		<div>
			
		</div>
		<div>
			<textarea cols="15" rows="15" v-model="description"></textarea>
		</div>
		<div v-if="format">
			<button class="app_pokemon_btn" @click="updatePokemon">Update</button>
		</div>
		<div v-else>
			<button class="app_pokemon_btn" @click="addPokemon">Add</button>
		</div>
	</div>
</template>

<script>
	import PokemonService from "@/services/PokemonService"
	import TypeService from "@/services/TypeService"

	export default {
		name: "pokemon-form",
		props: {
			format: String
		},
		data() {
			return {
				nationalDex: '',
				englishName: '',
				japaneseName:'',
				germanName: '',
				frenchName:'',
				koreanName: '',
				classification: '',
				height: '',
				weight: '',
				egg1: '',
				egg2: '',
				ability1: '',
				ability2: '',
				ability3: '',
				hiddenAbility: '',
				type1: '',
				type2: '',
				typeList: '',
				description: ''
			}
		},
		mounted() {
			if(this.format === "update"){ this.getPokemon();}
			this.getTypeList()
		},
		methods: {
			national(natDex){
				natDex = natDex.toString();
				if(natDex.length === 1) { return "00"+natDex+"."; }
				else if(natDex.length === 2) { return "0"+natDex+"."; }
				return natDex+".";
			},
			pokemonClass(id){
				let pc = {
					pokedex: {
						national: this.national(this.nationalDex)
					},
					name: {
						english: this.englishName,
						japanese: this.japaneseName,
						german: this.germanName,
						french: this.frenchName,
						korean: this.koreanName
					},
					data: {
						classification: this.classification + " Pokemon",
						height: this.height+"m",
						weight: this.weight+"kg",
						egg: {
							one: this.egg1,
							two: this.egg2
						},
						abilities: {
							first: this.ability1,
							second: this.ability2,
							third: this.ability3,
							hidden: this.hiddenAbility
						},
						types: {
							main: this.type1,
							secondary: this.type2
						}
					},
					description: this.description
				};	
				if(id){
					return {...pc, id: id};
				}
				return pc;
			},
			async getTypeList(){
				const response = await TypeService.fetchTypes()
				this.typeList = response.data.types.map(a => { 
					return {id: a._id, name: a.name}
				})
			},
			async addPokemon () {
				await PokemonService.addPokemon(this.pokemonClass())
				this.$router.push({name: 'Pokemon'})
			},
			async updatePokemon() {
				await PokemonService.updatePokemon(this.pokemonClass(this.$route.params.id))
				this.$router.push({ name: "Pokemon" })
			},
			async getPokemon(){
				const response = await PokemonService.getPokemon({
					id: this.$route.params.id
				})
				this.nationalDex = parseInt(response.data.pokedex.national)
				this.englishName = response.data.name.english
				this.japaneseName = response.data.name.japanese
				this.germanName = response.data.name.german
				this.frenchName = response.data.name.french
				this.koreanName = response.data.name.korean
				this.classification = response.data.data.classification.replace(' Pokemon', '')
				this.height = response.data.data.height.replace('m', '')
				this.weight = response.data.data.weight.replace('kg', '')
				this.egg1 = response.data.data.egg.one
				this.egg2 = response.data.data.egg.two
				this.ability1 = response.data.data.abilities.first
				this.ability2 = response.data.data.abilities.second
				this.ability3 = response.data.data.abilities.third
				this.hiddenAbility = response.data.data.abilities.hidden
				this.type1 = response.data.data.types.main
				this.type2 = response.data.data.types.secondary
				this.description = response.data.description
			},
		}
	}
</script>
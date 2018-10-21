<template>
	<div class="form">
		<div>
			<h2>Type Name</h2>
			<input type="text" name="name" placeholder="Name" v-model="name">
		</div>
		<div>
			<h2>Colors</h2>
			<div>
				<h3>Light</h3>
				<input type="text" name="light" placeholder="Light Color" v-model="light">
			</div>
			<div>
				<h3>Normal</h3>
				<input type="text" name="normal" placeholder="Type Color" v-model="normal">
			</div>
			<div>
				<h3>Dark</h3>
				<input type="text" name="dark" placeholder="Dark Color" v-model="dark">
			</div>
		</div>
		<div>
			<h2>Damage Relationship</h2>
			<p>To</p>
			<div v-for="(value, key) in damage_relations" :key="key">
				<input type="text" name="damage_to" placeholder="type" v-model="value.type" readonly>
				<input type="number" name="multiplier" min="0" max="2" step="0.5" v-model="value.multiplier">
			</div>
		</div>
		<div v-if="format">
			<button class="app_pokemon_btn" @click="updateType">Update</button>
		</div>
		<div v-else>
			<button class="app_pokemon_btn" @click="addType">Add</button>
		</div>
	</div>
</template>

<script>
	import TypeService from '@/services/TypeService';

	export default {
		name: "TypeForm",
		props: {
			format: String
		},
		data() {
			return {
				name: '',
				data: '',
				damage_relations: [],
				light: '',
				normal: '',
				dark: ''
			}
		},
		mounted() {
			let t = this.getAllTypes()
			if(this.format === "update"){ 
				this.getType(t);
			}
			
		},
		methods: {
			formatRelations(results, types){
				let p = Promise.resolve(types)
				p.then((v) => {
					let m = v.map((a, i) => {
						results.to.no.map((b, i) => {
							if(b.name === a.type) {
								this.damage_relations.map((c, i) => {
									if (c.type === a.type) c.multiplier = 0;
								})
							}
						})
						results.to.half.map((b, i) => {
							if(b.name === a.type) {
								this.damage_relations.map((c, i) => {
									if (c.type === a.type) c.multiplier = 0.5;
								})
							}
						})
						results.to.double.map((b, i) => {
							if(b.name === a.type) {
								this.damage_relations.map((c, i) => {
									if (c.type === a.type) c.multiplier = 2;
								})
							}
						})
					})
				})
			},
			getProp(i){
				return this.damage_relations
					.filter(a => a.multiplier.toString() === i)
					.map(a => {return {name: a.type}})
			},
			typeClass(id){
				let tc = {
					name: this.name,
					damage_relations: {
						to: {
							no: this.getProp("0"),
							half: this.getProp("0.5"),
							double: this.getProp("2")
						}
					},
					colors: {
						light: this.light,
						normal: this.normal,
						dark: this.dark
					}
				};
				if(id){
					return {...tc, id: id}
				}
				return tc;
			},
			async addType () {
				await TypeService.addType(this.typeClass())
				this.$router.push({name: 'Types'})
			},
			async updateType() {
				await TypeService.updateType(this.typeClass(this.$route.params.id))
				this.$router.push({ name: "Types" })
			},
			async getType(t){
				const response = await TypeService.getType({
					id: this.$route.params.id
				})
				this.name = response.data.name
				this.data = this.formatRelations(response.data.damage_relations, t)
				this.light = response.data.colors.light
				this.normal = response.data.colors.normal
				this.dark = response.data.colors.dark
			},
			async getAllTypes(){
				const response = await TypeService.fetchTypes()
				let t = response.data.types.map((a, i) => {
					return {type: a.name, multiplier: 1};
				});
				this.damage_relations = t
				if (this.format === 'update') return t;
			}
		}
	}
</script>
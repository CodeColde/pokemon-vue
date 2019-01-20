<template>
	<div class="matrix">
		<Navigation />
		<h1>Type Matrix</h1>
		<div class='table-wrap'>
			<div>
				<router-link v-bind:to="{ name: 'Types' }" class="">Types</router-link> |
				<router-link v-bind:to="{ name: 'TypeMatrix' }" class="">Type Matrix</router-link>
			</div>
		</div>
		<table>
			<thead>
				<tr>
					<th v-for="(type, index) in typeList" :key="index" :style="{color: type.color}">{{type.name}}</th> 
				</tr>
			</thead>
			<tr v-for="(val, index) in matrix" :key="index">
				<td v-for="(block, key) in val" :key="key">{{block}}</td>
			</tr>
		</table>
	</div>
</template>

<script>
	import TypeService from '@/services/TypeService'
	import Navigation from "@/components/Navigation"

	export default{
		name: "TypeMatrix",
		components: {
			Navigation
		},
		data() {
			return {
				typeList: '',
				matrix: ''
			}
		},
		mounted() {
			this.getMatrix();
		},
		methods: {
			formatType(types) {
				let typeArr = types.map(a => { return {name: a.name, color: a.colors.normal} })
				return ["", ...typeArr]
			},
			checkMultiplier(arr, type){
				let multiplier = arr.map(a => { return a.name === type ? true : false })
				return multiplier.indexOf(true) > -1 ? true : false
			},
			formatMultiplier(o, t){
				if(!t) return o.name
				if (this.checkMultiplier(o.damage_relations.to.no, t)) return "0"
				if (this.checkMultiplier(o.damage_relations.to.half, t)) return "0.5"
				if (this.checkMultiplier(o.damage_relations.to.double, t)) return "2"
				return "1"
			},
			async getMatrix() {
				const response = await TypeService.fetchTypes()
				let typeArr = this.formatType(response.data.types),
					offense = response.data.types,
					matrix = offense.map(o => {
						return typeArr.map(t => { return this.formatMultiplier(o, t.name) })
					})
				this.typeList = typeArr
				this.matrix = matrix;				
			}
		}
	}
</script>
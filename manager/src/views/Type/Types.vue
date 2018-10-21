<template>
	<div class="types">
		<Navigation />
		<h1>{{ title }}</h1>
		<div class='table-wrap'>
			<div>
				<router-link v-bind:to="{ name: 'AddType' }" class="">Add Type</router-link> |
				<router-link v-bind:to="{ name: 'TypeMatrix' }" class="">Type Matrix</router-link>
			</div>
		</div>
		<table v-if="types.length > 0">
			<tr>
				<td>Name</td>
				<td width="100" align="center">Action</td>
			</tr>
			<tr v-for="(type, index) in types" :key="index">
				<td v-if="type.name" :style="{color: type.colors.normal}">{{ type.name }}</td><td v-else>(no name)</td>
				<td align="center">
					<router-link v-bind:to="{ name: 'EditType', params: { id: type._id } }">Edit</router-link> | <a href="#" @click="deleteType(type._id)">Delete</a>
				</td>
			</tr>
		</table>
		<div v-else>
			No types available. Add one with the link above.
		</div>
		
	</div>
</template>

<script>
	import TypeService from '../../services/TypeService'
	import Navigation from "../../components/Navigation"

	export default {
		name: "Types",
		components: {
			Navigation
		},
		data() {
			return {
				title: "Types",
				types: []
			}
		},
		mounted() {
			this.getTypes()
		},
		methods: {
			async getTypes () {
				const response = await TypeService.fetchTypes()
				this.types = response.data.types
			},
			async deleteType (id) {
				if(confirm("Are you sure you want to delete this type? All relevant data will be erased!")){
					await TypeService.deleteType(id)
					this.$router.push({name: "Types"})
				}
			}
		}
	}
</script>
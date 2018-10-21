<template>
	<div class="pokemon">
		<h1>{{ title }}</h1>
		<PokemonForm format="update"/>
	</div>
</template>

<script>
	import PokemonService from '../../services/PokemonService'
	import PokemonForm from "../../components/forms/PokemonForm.vue"

	export default {
		name: 'EditPokemon',
		components: {
			PokemonForm
		},
		data() {
			return {
				title: 'Edit Pokemon'
			}
		}
	}
</script>
<style type="text/css">
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>
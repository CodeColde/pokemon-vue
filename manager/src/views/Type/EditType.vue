<template>
	<div class="form">
		<Navigation />
		<h1>Edit Type</h1>
		<TypeForm format="update" />
	</div>
</template>

<script>
	import Navigation from "../../components/Navigation"
	import TypeForm from "../../components/forms/TypeForm.vue"

	export default {
		name: "EditType",
		components: {
			Navigation,
			TypeForm
		},
		data() {
			return {}
		}
	}
</script>
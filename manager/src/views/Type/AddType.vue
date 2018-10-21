<template>
	<div class="form">
		<Navigation />
		<h1>Add Type</h1>
		<TypeForm />
	</div>
</template>

<script>
	import Navigation from "@/components/Navigation"
	import TypeForm from "@/components/forms/TypeForm.vue"

	export default {
		name: "AddType",
		components: {
			Navigation,
			TypeForm
		},
		data() {
			return {}
		}
	}
</script>
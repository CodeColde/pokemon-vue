<template>
	<div class="nav" id="nav">
		<router-link v-for="(route, i) in routes" :key ='i' :to="route.url">{{ route.name }}</router-link>

    </div>
</template>

<script>
	export default{
		name: "Navigation",
		data() {
			return {
				routes: [
					{
						url: '/manager',
						name: " Home |"
					},
					{
						url: '/manager/about',
						name: " About |"
					},
					{
						url: '/manager/pokemon',
						name: " Pokemon |"
					},
					{
						url: '/manager/types',
						name: " Types"
					}
				]
			}
		}
	}
</script>
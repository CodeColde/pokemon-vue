<template>
  <div class="home">

    <img alt="Vue logo" src="../assets/logo.png">
    <Navigation />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Navigation from "@/components/Navigation.vue";

@Component({
  components: {
    HelloWorld,
    Navigation
  },
})
export default class Home extends Vue {}
</script>

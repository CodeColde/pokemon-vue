<template>
  <div class="home">
    <PokemonList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PokemonList from '@/components/PokemonList.vue'; // @ is an alias to /src

@Component({
  components: {
    PokemonList
  },
})
export default class Home extends Vue {}
</script>

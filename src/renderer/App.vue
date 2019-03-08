<template>
  <div id="app">
    <loading-pokedex v-if="!pokedexIsReady"></loading-pokedex>
    <pokedex v-else></pokedex>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import LoadingPokedex from '@/components/LoadingPokedex'
  import Pokedex from '@/components/Pokedex/Pokedex'

  export default {
    name: 'poke-vue',
    components: {
      LoadingPokedex,
      Pokedex
    },
    computed: {
      ...mapGetters(['pokedexIsReady'])
    }
  }
</script>

<style>
  /* CSS */
</style>

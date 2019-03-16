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

<style lang="scss">
  *, ::after, ::before {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }

  dl, ol, ul {
    margin-top: 0;
    margin-bottom: 1rem;
  }
</style>

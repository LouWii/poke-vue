<template>
  <main class="pokevue-container">
    <h1>Poke-Vue</h1>
    <loading-step v-if="!pokedexIsReady"></loading-step>
    <pokedex v-else></pokedex>
  </main>
</template>

<script>
  import {mapGetters} from 'vuex'
  import LoadingStep from './LoadingStep'
  import Pokedex from './Pokedex/Pokedex'

  export default {
    name: 'poke-landing',
    components: { LoadingStep, Pokedex },
    computed: {
      ...mapGetters(['pokedexIsReady'])
    },
    methods: { }
  }
</script>
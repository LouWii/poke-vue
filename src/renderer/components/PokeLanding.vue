<template>
  <main class="pokevue-container">
    <h1>Poke-Vue</h1>
    <loading-step v-if="!pokedexIsReady"></loading-step>
    <div>Pokedex Ready</div>
  </main>
</template>

<script>
  import {mapGetters} from 'vuex'
  import LoadingStep from './LoadingStep'

  export default {
    name: 'poke-landing',
    components: { LoadingStep },
    computed: {
      ...mapGetters(['pokedexIsReady'])
    },
    methods: { }
  }
</script>
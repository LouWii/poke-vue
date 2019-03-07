<template>
  <div>
    <h3>
      {{ currentPokemonName }}
    </h3>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'poke-single',
    computed: {
      ...mapGetters(['currentPokemonName'])
    }
  }
</script>

<style>

</style>

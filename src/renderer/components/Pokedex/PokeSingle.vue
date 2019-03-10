<template>
  <div class="pokemon-single">
    <header>
      <h3>
        {{ currentPokemonName }}
      </h3>
      <button @click="onClose">X</button>
      <div class="">
        <poke-varieties-sprites :varietyIds="currentPokemonVarietyIds"></poke-varieties-sprites>
      </div>
    </header>
    <section class="body-wrapper">
      <poke-varieties v-if="currentPokemon" :pokemon="currentPokemon"></poke-varieties>
    </section>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import PokeVarieties from './PokeVariety/PokeVarieties'
  import PokeVarietiesSprites from './PokeVariety/PokeVarietiesSprites'

  export default {
    name: 'poke-single',
    components: {PokeVarieties, PokeVarietiesSprites},
    computed: {
      ...mapGetters(['currentPokemon', 'currentPokemonName', 'currentPokemonVarietyIds'])
    },
    mounted () {
      console.log(this.currentPokemon)
      if (this.currentPokemon === null) {
        this.loadCurrentPokemon()
      }
    },
    methods: {
      ...mapActions(['closePokemon', 'loadCurrentPokemon']),
      ...{
        onClose () {
          this.closePokemon()
        }
      }
    }
  }
</script>

<style lang="scss">
  .pokemon-single {
    &.black {
      
    }
    &.blue {

    }
    &.brown {

    }
    &.gray {

    }
    &.green {

    }
    &.pink {

    }
    &.purple {

    }
    &.red {

    }
    &.white {

    }
    &.yellow {
      
    }
    h3 {
      text-transform: capitalize;
    }
  }
</style>

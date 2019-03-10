<template>
  <div class="pokemon-single">
    <header>
      <poke-variety-sprites :varietyId="currentPokemonDefaultVarietyId" :displayFrontOnly="true"></poke-variety-sprites>
      <h3>
        {{ currentPokemonName }}
      </h3>
      <button class="close" @click="onClose">X</button>
    </header>
    <section class="body-wrapper">
      <poke-varieties v-if="currentPokemon" :pokemon="currentPokemon"></poke-varieties>
    </section>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import PokeVarieties from './PokeVariety/PokeVarieties'
  import PokeVarietySprites from './PokeVariety/PokeVarietySprites'

  export default {
    name: 'poke-single',
    components: {PokeVarieties, PokeVarietySprites},
    computed: {
      ...mapGetters(['currentPokemon', 'currentPokemonName', 'currentPokemonDefaultVarietyId', 'currentPokemonVarietyIds'])
    },
    mounted () {
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
    header {
      position: relative;
      text-align: center;

      h3, .pokemon-varieties-sprites {
        display: inline-block;
        vertical-align: middle;
      }

      h3 {
        text-transform: capitalize;
      }

      .close {
        position: absolute;
        right: 10px;
        top: 10px;
      }
    }
    
  }
</style>

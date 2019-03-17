<template>
  <div class="pokemon-single">
    <header>
      <poke-variety-sprites :varietyId="currentPokemonDefaultVarietyId" :displayFrontOnly="true"></poke-variety-sprites>
      <h3>
        {{ currentPokemonName }}
      </h3>
      <button class="close clear" @click="onClose" title="Close">
        <font-awesome-icon icon="times"/>
      </button>
    </header>
    <section class="body-wrapper">
      <div class="pokemon-single-data">
        <hr/>
        <poke-summary :summaries="currentPokemonSummariesGrouped"></poke-summary>
        <hr/>
        <div class="genera"><label>Genus</label> {{currentPokemonGenera}}</div>
      </div>
      <poke-varieties v-if="currentPokemon" :pokemon="currentPokemon"></poke-varieties>
    </section>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import PokeSummary from './PokeSpecies/PokeSummary'
  import PokeVarieties from './PokeVariety/PokeVarieties'
  import PokeVarietySprites from './PokeVariety/PokeVarietySprites'

  export default {
    name: 'poke-single',
    components: { PokeSummary, PokeVarieties, PokeVarietySprites },
    computed: {
      ...mapGetters([
        'currentPokemon',
        'currentPokemonGenera',
        'currentPokemonName',
        'currentPokemonSummaries',
        'currentPokemonSummariesGrouped',
        'currentPokemonDefaultVarietyId',
        'currentPokemonVarietyIds'
      ])
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
    label {
      display: inline-block;
      font-weight: bold;
      margin: 5px 10px;
    }
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
      // text-align: center;

      h3, .pokemon-varieties-sprites {
        display: inline-block;
        vertical-align: middle;
      }

      h3 {
        text-transform: capitalize;
      }

      .close {
        position: absolute;
        right: 0px;
        top: 0px;
      }
    }
    
  }
</style>

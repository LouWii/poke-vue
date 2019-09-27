<template>
  <div class="pokemon">
    <header v-if="pokemonSpecies">
      <!-- Need to fetch the default variety for the Species and then display the default front sprite -->
      <!-- <poke-variety-sprites :varietyId="currentPokemonDefaultVarietyId" :displayFrontOnly="true"></poke-variety-sprites> -->
      <h3>
        <translated-name :pokemon="pokemonSpecies"/>
      </h3>
    </header>
    <section class="body-wrapper" v-if="pokemonSpecies">
      <div class="pokemon-single-data">
        <translated-summary :speciesId="$route.params.id"/>
        <hr/>
        <!-- <div class="genera"><label>Genus</label> {{currentPokemonGenera}}</div> -->
      </div>
      <!-- <poke-varieties v-if="currentPokemon" :pokemon="currentPokemon"></poke-varieties> -->
      <varieties :speciesId="$route.params.id"/>
      <evolution-chain :evolutionChainId="pokemonSpecies.evolution_chain_id"/>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import EvolutionChain from '@/components/EvolutionChain/EvolutionChain'
import TranslatedSummary from '@/components/Pokemon/TranslatedSummary'
import TranslatedName from '@/components/Pokemon/TranslatedName'
import Varieties from '@/components/Pokemon/Varieties'

export default {
  name: 'Pokemon',
  components: {EvolutionChain, TranslatedSummary, TranslatedName, Varieties},
  data: () => {
    return {
      pokemon: null,
      pokemonSpecies: null,
    }
  },
  beforeMount: function() {
    this.initView()
  },
  methods: {
    ...mapActions(['getPokemonSpecies']),
    initView: function() {
      this.getPokemonSpecies(parseInt(this.$route.params.id, 10))
      .then(row => {
        this.pokemonSpecies = row
      })
      .catch(error => {
        console.error(error)
      })
    }
  },
  watch: {
    $route: {
      handler: function() {
        this.initView()
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
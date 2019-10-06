<template>
  <div class="pokemon">
    <header v-if="pokemonSpecies">
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
      <varieties :speciesId="$route.params.id" :translatedSpeciesName="pokemonSpecies.t_name" />
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
  .pokemon {
    padding-bottom: $padding-global;

    header {
      h3 {
        margin: $padding-global-medium $padding-global;
      }
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
  }
</style>
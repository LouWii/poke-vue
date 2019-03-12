<template>
  <section class="pokemon-variety" :data-id="pokemonVarietyId">
    <header v-if="pokemonHasMultiple">
      <h4 v-if="currentVariety">{{ currentVariety.name }}</h4>
      <h4 v-else>{{ varietyTempName }}</h4>
    </header>
    <div v-if="currentVariety">
      <div class=""><label>Height</label><span>{{ currentVariety.height }}</span></div>
      <div class=""><label>Weight</label><span>{{ currentVariety.height }}</span></div>
    </div>
    <div class="moves">
      <h4>Moves</h4>
      <poke-moves :moves="getVarietyMovesGroupedByVersionsAndLearnMethod(pokemonVarietyId)"></poke-moves>
    </div>
  </section>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import PokeMoves from './PokeMoves'

  export default {
    name: 'poke-variety',
    components: { PokeMoves },
    props: {
      pokemonVarietyId: {
        type: Number,
        required: true
      },
      isDefaultVariety: {
        type: Boolean,
        default: false
      },
      pokemonHasMultiple: {
        type: Boolean,
        default: true
      },
      varietyTempName: {
        type: String,
        default: null
      }
    },
    computed: {
      ...mapGetters(['getVariety', 'getVarietyMovesGroupedByVersionsAndLearnMethod']),
      ...{
        currentVariety: function () { return this.getVariety(this.pokemonVarietyId) }
      }
    },
    mounted: function () {
      this.triggerLoad()
    },
    updated: function () {
      this.triggerLoad()
    },
    methods: {
      ...mapActions(['loadVariety']),
      ...{
        triggerLoad: function () {
          if (typeof this.currentVariety === 'undefined') {
            this.loadVariety(this.pokemonVarietyId)
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  .pokemon-variety {
    header {
      h4 {
        text-transform: capitalize
      }
    }
  }
</style>
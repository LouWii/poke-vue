<template>
  <section class="pokemon-variety" :data-id="pokemonVarietyId">
    <header v-if="pokemonHasMultiple">
      <h4 v-if="currentVariety">{{ currentVariety.name }}</h4>
      <h4 v-else>{{ varietyTempName }}</h4>
    </header>
    <div class="variety-details" v-if="currentVariety">
      <poke-variety-sprites :varietyId="pokemonVarietyId" :displayVarietyFormMenu="true"></poke-variety-sprites>
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
  import PokeVarietySprites from './PokeVarietySprites'

  export default {
    name: 'poke-variety',
    components: { PokeMoves, PokeVarietySprites },
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

    .variety-details {
      .pokemon-varieties-sprites {
        .pokemon-variety-sprites, .pokemon-variety-sprites-nav {
          display: inline-block;
          vertical-align: middle;
        }
        .pokemon-variety-sprites-nav {
          button {
            display: block;
            margin: 0 auto 10px auto;
            text-align: center;

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
</style>
<template>
  <section class="pokemon-variety" :data-id="variety.id">
    <!-- Don't really need a header as we choose the variety via button in Varieties -->
    <header v-if="pokemonHasMultiple">
      <h4 v-if="variety">{{ variety.name }}</h4>
      <h4 v-else>{{ varietyTempName }}</h4>
    </header>
    <div class="variety-details" v-if="variety">
      <!-- <poke-variety-sprites :varietyId="pokemonVarietyId" :displayVarietyFormMenu="true"></poke-variety-sprites> -->
      <pokemon-sprites :varietyId="variety.id" :displayVarietyFormMenu="true" />
      <div class=""><label>Height</label><span>{{ variety.height }}</span></div>
      <div class=""><label>Weight</label><span>{{ variety.height }}</span></div>
    </div>
    <div class="moves">
      <h4>Moves</h4>
      <!-- <poke-moves :moves="getVarietyMovesGroupedByVersionsAndLearnMethod(pokemonVarietyId)"></poke-moves> -->
    </div>
  </section>
</template>

<script>
import PokemonSprites from '@/components/Pokemon/PokemonSprites'

export default {
  name: 'Variety',
  components: {PokemonSprites},
  props: {
    pokemonHasMultiple: {
      type: Boolean,
      default: true
    },
    variety: {
      type: Object,
      required: true
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
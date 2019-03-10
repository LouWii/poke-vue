<template>
  <div class="pokemon-varieties-sprites">
    <div class="pokemon-variety-sprite-unknown">
      <!-- Display random shape when we can't display the real one -->
    </div>
    <div class="pokemon-variety-sprites" v-if="currentFrontDefaultSprite">
      <div class="sprite-front">
        <img :src="currentFrontDefaultSprite" alt=""/>
      </div>
      <div class="sprite-back" v-if="currentBackDefaultSprite">
        <img :src="currentBackDefaultSprite" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'poke-varieties-sprites',
    props: {
      varietyIds: {
        type: Array,
        required: true
      }
    },
    data: function () {
      return {
        currentVarietyId: null
      }
    },
    mounted: function () {
      this.currentVarietyId = this.varietyIds[0]
    },
    computed: {
      ...mapGetters(['getVariety']),
      ...{
        currentFrontDefaultSprite: function () {
          const variety = this.getVariety(this.currentVarietyId)
          return variety ? variety.sprites.front_default : null
        },
        currentBackDefaultSprite: function () {
          const variety = this.getVariety(this.currentVarietyId)
          return variety ? variety.sprites.back_default : null
        }
      }
    }
  }
</script>

<style lang="scss">
  .pokemon-varieties-sprites {
    .pokemon-variety-sprites {
      .sprite-front, .sprite-back {
        display: inline-block;
        padding: 0 15px;
      }
    }
  }
</style>

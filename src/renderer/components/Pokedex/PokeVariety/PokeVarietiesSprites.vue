<template>
  <div class="pokemon-varieties-sprites">
    <div class="pokemon-variety-sprite-unknown">
      <!-- Display random shape when we can't display the real one -->
    </div>
    <div class="pokemon-variety-sprites" v-if="currentFrontDefaultSprite">
      <div class="sprite-front">
        <img :src="currentFrontSprite" alt=""/>
      </div>
      <div class="sprite-back" v-if="currentBackDefaultSprite">
        <img :src="currentBackSprite" alt="" />
      </div>
    </div>
    <div class="pokemon-variety-sprites-nav" v-if="showVarietyMenu">
      <button
        data-front-sprite-form="front_default"
        data-back-sprite-form="back_default"
        v-if="currentFrontDefaultSprite"
        @click="onSpriteFormChange">Male</button>
      <button
        data-front-sprite-form="front_female"
        data-back-sprite-form="back_female"
        v-if="currentFrontFemaleSprite"
        @click="onSpriteFormChange">Female</button>
      <button
        data-front-sprite-form="front_shiny"
        data-back-sprite-form="back_shiny"
        v-if="currentFrontShinySprite"
        @click="onSpriteFormChange">Shiny Male</button>
      <button
        data-front-sprite-form="front_shiny_female"
        data-back-sprite-form="back_shiny_female"
        v-if="currentFrontShinyFemaleSprite"
        @click="onSpriteFormChange">Shiny Female</button>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'poke-varieties-sprites',
    props: {
      showVarietyMenu: {
        type: Boolean,
        default: false
      },
      varietyIds: {
        type: Array,
        required: true
      }
    },
    data: function () {
      return {
        currentVarietyId: null,
        currentSpriteFormFront: 'front_default',
        currentSpriteFormBack: 'back_default'
      }
    },
    mounted: function () {
      this.currentVarietyId = this.varietyIds[0]
    },
    computed: {
      ...mapGetters(['getVariety']),
      ...mapState({
        varieties: (state) => state.Varieties.varieties
      }),
      ...{
        currentVariety: function () { return this.getVariety(this.currentVarietyId) },
        currentFrontSprite: function () {
          return this.currentVariety ? this.currentVariety.sprites[this.currentSpriteFormFront] : null
        },
        currentBackSprite: function () {
          return this.currentVariety ? this.currentVariety.sprites[this.currentSpriteFormBack] : null
        },
        currentFrontDefaultSprite: function () {
          return this.currentVariety ? this.currentVariety.sprites.front_default : null
        },
        currentBackDefaultSprite: function () {
          return this.currentVariety ? this.currentVariety.sprites.back_default : null
        },
        currentFrontFemaleSprite: function () {
          return this.currentVariety ? this.currentVariety.sprites.front_female : null
        },
        currentBackFemaleSprite: function () {
          return this.currentVariety ? this.currentVariety.sprites.back_female : null
        },
        currentFrontShinySprite: function () {
          return this.currentVariety ? this.currentVariety.sprites.front_shiny : null
        },
        currentBackShinySprite: function () {
          return this.currentVariety ? this.currentVariety.sprites.back_shiny : null
        },
        currentFrontShinyFemaleSprite: function () {
          return this.currentVariety ? this.currentVariety.sprites.front_shiny_female : null
        },
        currentBackShinyFemaleSprite: function () {
          return this.currentVariety ? this.currentVariety.sprites.back_shiny_female : null
        }
      }
    },
    methods: {
      ...{
        onSpriteFormChange: function (event) {
          this.currentSpriteFormFront = event.currentTarget.getAttribute('data-front-sprite-form')
          this.currentSpriteFormBack = event.currentTarget.getAttribute('data-back-sprite-form')
        }
      }
    },
    watch: {
      varietyIds: {
        handler: function (newVarietyIds) {
          this.currentVarietyId = this.varietyIds[0]
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

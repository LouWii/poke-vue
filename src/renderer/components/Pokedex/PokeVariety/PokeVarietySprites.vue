<template>
  <div class="pokemon-varieties-sprites">
    <div class="pokemon-variety-sprite-unknown">
      <!-- Display random shape when we can't display the real one -->
    </div>
    <div class="pokemon-variety-sprites" v-if="currentFrontSprite">
      <div class="sprite-front">
        <img :src="currentFrontSprite" alt=""/>
      </div>
      <div class="sprite-back" v-if="!displayFrontOnly && currentBackSprite">
        <img :src="currentBackSprite" alt="" />
      </div>
    </div>
    <div class="pokemon-variety-sprites-nav" v-if="displayVarietyFormMenu">
      <button
        data-front-sprite-form="front_default"
        data-back-sprite-form="back_default"
        v-if="hasDefault"
        @click="onSpriteFormChange"><span v-if="hasFemale">Male</span><span v-else>Default</span></button>
      <button
        data-front-sprite-form="front_female"
        data-back-sprite-form="back_female"
        v-if="hasFemale"
        @click="onSpriteFormChange">Female</button>
      <button
        data-front-sprite-form="front_shiny"
        data-back-sprite-form="back_shiny"
        v-if="hasShinyDefault"
        @click="onSpriteFormChange"><span v-if="hasFemale">Shiny Male</span><span v-else>Shiny</span></button>
      <button
        data-front-sprite-form="front_shiny_female"
        data-back-sprite-form="back_shiny_female"
        v-if="hasShinyFemale"
        @click="onSpriteFormChange">Shiny Female</button>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'

  export default {
    name: 'poke-variety-sprites',
    props: {
      displayFrontOnly: {
        type: Boolean,
        default: false
      },
      displayVarietyFormMenu: {
        type: Boolean,
        default: false
      },
      varietyId: {
        required: true,
        validator: prop => typeof prop === 'number' || prop === null
      }
    },
    data: function () {
      return {
        currentSpriteFormFront: 'front_default',
        currentSpriteFormBack: 'back_default'
      }
    },
    computed: {
      ...mapGetters(['getVariety']),
      ...mapState({
        varieties: (state) => state.Varieties.varieties
      }),
      ...{
        currentVariety: function () { return this.getVariety(this.varietyId) },
        currentFrontSprite: function () {
          return this.currentVariety ? this.currentVariety.sprites[this.currentSpriteFormFront] : null
        },
        currentBackSprite: function () {
          return this.currentVariety ? this.currentVariety.sprites[this.currentSpriteFormBack] : null
        },
        hasDefault: function () {
          return this.currentVariety.sprites['front_default'] !== null
        },
        hasFemale: function () {
          return this.currentVariety.sprites['front_female'] !== null
        },
        hasShinyDefault: function () {
          return this.currentVariety.sprites['front_shiny'] !== null
        },
        hasShinyFemale: function () {
          return this.currentVariety.sprites['front_shiny_female'] !== null
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
    }
  }
</script>

<style lang="scss">
  .pokemon-varieties-sprites {
    .pokemon-variety-sprites {
      img {
        max-height: 250px;
        max-width: 250px;
      }

      .sprite-front, .sprite-back {
        display: inline-block;
        padding: 0 15px;
      }
    }
  }
</style>

<template>
  <div class="pokemon-varieties-sprites">
    <div class="pokemon-variety-sprite-unknown">
      <!-- TODO: Display random shape when we can't display the real one -->
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
import {mapActions} from 'vuex'

export default {
  name: 'PokemonSprites',
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
      currentSpriteFormBack: 'back_default',
      defaultSpritFormFront: 'front_default',
      defaultSpritFormBack: 'back_default',
      sprites: null,
    }
  },
  beforeMount: function() {
    this.fetchSprites()
  },
  computed: {
    currentFrontSprite: function () {
      return this.sprites && this.sprites[this.currentSpriteFormFront] ? this.getSpriteUrl(this.sprites[this.currentSpriteFormFront]) : null
    },
    currentBackSprite: function () {
      return this.sprites && this.sprites[this.currentSpriteFormBack] ? this.getSpriteUrl(this.sprites[this.currentSpriteFormBack]) : null
    },
    hasDefault: function () {
      return this.sprites && this.sprites['front_default'] !== null
    },
    hasFemale: function () {
      return this.sprites && this.sprites['front_female'] !== null
    },
    hasShinyDefault: function () {
      return this.sprites && this.sprites['front_shiny'] !== null
    },
    hasShinyFemale: function () {
      return this.sprites && this.sprites['front_shiny_female'] !== null
    }
  },
  methods: {
    ...mapActions(['getPokemonSprites']),
    fetchSprites() {
      this.getPokemonSprites(this.varietyId)
        .then(rows => {
          this.sprites = JSON.parse(rows.sprites)
        })
        .catch(error => {
          console.error(error)
        })
    },
    getSpriteUrl(spritePath) {
      return 'https://raw.githubusercontent.com/PokeAPI/sprites/master' + spritePath.replace('/media', '')
    },
    onSpriteFormChange: function (event) {
      this.currentSpriteFormFront = event.currentTarget.getAttribute('data-front-sprite-form')
      this.currentSpriteFormBack = event.currentTarget.getAttribute('data-back-sprite-form')
    }
  },
  watch: {
    varietyId: {
      handler: function() {
        this.currentSpriteFormFront = this.defaultSpritFormFront
        this.currentSpriteFormBack = this.defaultSpritFormBack
        this.fetchSprites()
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
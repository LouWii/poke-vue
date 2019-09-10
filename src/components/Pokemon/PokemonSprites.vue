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
      currentSpriteFormBack: 'back_default'
    }
  },
  computed: {
    
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
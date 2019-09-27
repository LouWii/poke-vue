<template>
  <div class="species-sprite">
    <img v-if="spriteUrl" :src="spriteUrl" alt=""/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {defaultSpriteName, getSpriteUrl} from '@/utils/sprites'

export default {
  name: 'SpeciesDefaultSprite',
  props: {
    speciesId: {
      required: true
    }
  },
  data: () => {
    return {
      spriteUrl: ''
    }
  },
  beforeMount: function() {
    this.initSpeciesSprite()
  },
  methods: {
    ...mapActions(['getPokemonSprites', 'getSpeciesDefaultVariety']),
    initSpeciesSprite() {
      this.getSpeciesDefaultVariety(this.speciesId)
        .then(varietyId => {
          // Promise chaining doesn't work here for some reason?
          this.getPokemonSprites(varietyId)
            .then(row => {
              const parsedSprites = JSON.parse(row.sprites)
              if (parsedSprites[defaultSpriteName]) {
                this.spriteUrl = getSpriteUrl(parsedSprites[defaultSpriteName])
              }
            })
        })
    }
  }
}
</script>

<style lang="scss">
.species-sprite {
  img {
    max-height: 100%;
    max-width: 100%;
  }
}
</style>
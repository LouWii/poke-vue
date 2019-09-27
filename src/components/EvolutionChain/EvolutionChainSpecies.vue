<template>
  <div class="evolution-chain-species">
    <router-link :to="{name: 'pokemon', params: {id: species.id}}">
      <span class="species-item">
        <species-default-sprite :speciesId="species.id" />
        {{species.t_name||species.name}}
      </span>
    </router-link>
  </div>
</template>

<script>
import SpeciesDefaultSprite from '@/components/Pokemon/SpeciesDefaultSprite'

export default {
  name: 'EvolutionChainSpecies',
  components: {SpeciesDefaultSprite},
  props: {
    species: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.evolution-chain-species {
  .species-item {
    display: block;
    text-align: center;
  }

  .species-sprite {
    height: 60px;
    margin: 0 auto;
    width: 60px;
  }
}
</style>
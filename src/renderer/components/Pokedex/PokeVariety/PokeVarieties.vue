<template>
  <section class="pokemon-varieties">
    <div v-if="pokemon" class="varieties-wrapper">
      <poke-variety
        v-for="(pVariety, index) in pokemon.varieties"
        :key="index"
        :pokemonVarietyId="getIdFromUrl(pVariety.pokemon.url)"
        :isDefaultVariety="pVariety.is_default"
        :varietyTempName="pVariety.pokemon.name"></poke-variety>
    </div>
  </section>
</template>

<script>
  import {getIdFromUrl} from '../../../services/pokedex-api' // eslint-disable-line no-unused-vars
  import PokeVariety from './PokeVariety'

  export default {
    name: 'poke-varieties',
    components: {PokeVariety},
    props: {
      pokemon: {
        type: Object,
        required: true
      }
    },
    methods: {
      ...{
        getIdFromUrl
      }
    }
  }
</script>
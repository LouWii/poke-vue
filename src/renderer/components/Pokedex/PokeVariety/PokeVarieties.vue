<template>
  <section class="pokemon-varieties">
    <div v-if="pokemon.varieties.length > 1" class="varieties-selector-wrapper">
      <div class="selector">
        <ul>
          <li v-for="(pVariety, index) in pokemon.varieties" :key="index">
            <button>{{ pVariety.pokemon.name }}</button>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="pokemon" class="varieties-wrapper">
      <poke-variety
        v-for="(pVariety, index) in pokemon.varieties"
        :key="index"
        :pokemonVarietyId="getIdFromUrl(pVariety.pokemon.url)"
        :isDefaultVariety="pVariety.is_default"
        :varietyTempName="pVariety.pokemon.name"
        :pokemonHasMultiple="pokemon.varieties.length != 1"></poke-variety>
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

<style lang="scss">
.pokemon-varieties {
  .varieties-selector-wrapper {
    .selector {
      ul {
        display: flex;
        list-style: none;
        padding: 0;
      }
      li {
        padding: 5px 15px;
      }
    }
  }
}
</style>
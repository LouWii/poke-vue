<template>
  <main class="pokedex">
    <h2>Pokedex</h2>
    <div class="pokedex-content-wrapper">
      <poke-single v-if="currentPokemonId"></poke-single>
      <div>
        <ul>
          <li><button data-screen="pokemasterlist" type="button" @click="onMenuItemClick">Master List</button></li>
          <li><button data-screen="pokesettings" type="button" @click="onMenuItemClick">Settings</button></li>
        </ul>
      </div>
      <poke-master-list v-if="currentSection === 'pokemasterlist'"></poke-master-list>
      <poke-settings v-if="currentSection === 'pokesettings'"></poke-settings>
    </div>
  </main>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import PokeMasterList from './PokeMasterList'
  import PokeSettings from '../Settings/PokeSettings'
  import PokeSingle from './PokeSingle'

  export default {
    name: 'pokedex',
    components: { PokeMasterList, PokeSettings, PokeSingle },
    data: function () {
      return { }
    },
    computed: {
      ...mapState({
        currentPokemonId: state => state.CurrentPokemon.pokemonId,
        currentSection: state => state.Pokedex.currentSection
      })
    },
    methods: {
      ...mapActions(['setCurrentSection']),
      ...{
        onMenuItemClick (event) {
          this.setCurrentSection(event.currentTarget.getAttribute('data-screen'))
        }
      }
    }
  }
</script>

<style lang="scss">
  .pokedex-content-wrapper {

  }
</style>
<template>
  <div class="pokedex">
    <h2>Pokedex</h2>
    <div>
      <ul>
        <li><button data-screen="pokemasterlist" type="button" @click="onMenuItemClick">Master List</button></li>
        <li><button data-screen="pokesettings" type="button" @click="onMenuItemClick">Settings</button></li>
      </ul>
    </div>
    <poke-master-list v-if="currentScreen === 'pokemasterlist'"></poke-master-list>
    <poke-settings v-if="currentScreen === 'pokesettings'"></poke-settings>
  </div>
</template>

<script>
  import PokeMasterList from './PokeMasterList'
  import PokeSettings from '../Settings/PokeSettings'

  export default {
    name: 'pokedex',
    components: { PokeMasterList, PokeSettings },
    data: function () {
      return {
        currentScreen: ''
      }
    },
    computed: { },
    methods: {
      onMenuItemClick (event) {
        this.currentScreen = event.currentTarget.getAttribute('data-screen')
      }
    }
  }
</script>
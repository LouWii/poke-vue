<template>
  <div>
    <header class="pokedex-header">
      <div class="bubble-blue"></div>
      <div class="bubble-red"></div>
      <div class="bubble-yellow"></div>
      <div class="bubble-green"></div>
      <div class="block1"></div>
      <div class="block2"></div>
      <div class="block3"></div>
    </header>
    <main class="pokedex">
      <div class="pokedex-content-wrapper">
        <div class="pokedex-content-overlay" :class="{ active: overlayIsActive }">
          <poke-single v-if="currentPokemonId"></poke-single>
        </div>
        <div class="pokedex-content">
          <div>
            <ul>
              <li><button data-screen="pokemasterlist" type="button" @click="onMenuItemClick">Master List</button></li>
              <li><button data-screen="pokesettings" type="button" @click="onMenuItemClick">Settings</button></li>
            </ul>
          </div>
          <poke-master-list v-if="currentSection === 'pokemasterlist'"></poke-master-list>
          <poke-settings v-if="currentSection === 'pokesettings'"></poke-settings>
        </div>
      </div>
    </main>
  </div>
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
      }),
      ...{
        overlayIsActive: function () {
          return this.currentPokemonId !== null && typeof this.currentPokemonId !== 'undefined'
        }
      }
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
  .pokedex-header {
    background: #a02929;
    height: 100px;
    overflow: hidden;
    position: relative;

    .bubble-blue {
      background: #2f83b5;
      border: 4px solid #fff;
      border-radius: 50%;
      height: 55px;
      left: 15px;
      position: absolute;
      top: 15px;
      width: 55px;
    }

    .bubble-red, .bubble-yellow, .bubble-green {
      border-radius: 50%;
      height: 12px;
      position: absolute;
      top: 20px;
      width: 12px;
    }

    .bubble-red {
      background: rgba(255, 0, 0, 0.6);
      left: 90px;
    }

    .bubble-yellow {
      background: rgba(255, 255, 0, 0.65);
      left: 115px;
    }

    .bubble-green {
      background: rgba(0, 255, 0, 0.6);
      left: 140px;
    }

    .block1, .block2, .block3 {
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      position: absolute;
      top: 0;
    }

    .block1 {
      height: 86px;
      left: 0;
      width: 115px;
    }
    .block2 {
      height: 69px;
      left: 87px;
      transform: rotate(-36deg);
      width: 80px;
    }
    .block3 {
      height: 39px;
      left: 179px;
      width: 650px;
    }
  }
  .pokedex {
    background: #a02929;
    padding: 10px;
  }
  .pokedex-content-wrapper {
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    position: relative;

    .pokedex-content-overlay {
      &.active {
        & ~ .pokedex-content {
          display: none;
        }
      }
    }
  }
</style>
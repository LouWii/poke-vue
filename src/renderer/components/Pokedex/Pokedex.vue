<template>
  <div class="pokedex-wrapper">
    <header class="pokedex-header">
      <div class="bubble-blue"></div>
      <div class="bubble-red"></div>
      <div class="bubble-yellow"></div>
      <div class="bubble-green"></div>
      <div class="block1"></div>
      <div class="block2"></div>
      <div class="block3"></div>
      <button
        type="button"
        class="settings-trigger"
        :class="{ active: settingsOpened }"
        @click="onSettingsTrigger">
        <font-awesome-icon icon="cog"/>
      </button>
    </header>
    <main class="pokedex">
      <div class="pokedex-content-wrapper">
        <div class="pokedex-content-overlay" :class="{ active: overlayIsActive }">
          <poke-single v-if="currentPokemonId"></poke-single>
          <poke-settings v-if="settingsOpened"></poke-settings>
        </div>
        <div class="pokedex-content">
          <poke-master-list></poke-master-list>
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
        settingsOpened: state => state.Settings.settingsPanelOpen
      }),
      ...{
        overlayIsActive: function () {
          return (this.currentPokemonId !== null && typeof this.currentPokemonId !== 'undefined') ||
            this.settingsOpened
        }
      }
    },
    methods: {
      ...mapActions(['setCurrentSection', 'triggerSettingsPanel']),
      ...{
        onSettingsTrigger: function () {
          this.triggerSettingsPanel()
        }
      }
    }
  }
</script>

<style lang="scss">
  .pokedex-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .pokedex-header {
    background: $pokedex-red;
    flex-shrink: 0;
    height: 100px;
    overflow: hidden;
    position: relative;

    .bubble-blue {
      background: $pokedex-blue;
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

    .settings-trigger {
      background: none;
      border: 0;
      
      cursor: pointer;
      font-size: 20px;
      position: absolute;
      top: 3px;
      right: 10px;

      &:hover, &.active {
        .svg-inline--fa {
          color: rgba(0, 0, 0, 0.70);
        }
      }

      .svg-inline--fa {
        color: rgba(0, 0, 0, 0.40);
      }
    }
  }
  .pokedex {
    background: $pokedex-red;
    flex: 2;
    padding: 10px;
  }
  .pokedex-content-wrapper {
    background: #fff;
    border-radius: $border-radius-big;
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
<template>
  <div id="app">
    <loading-pokedex v-if="!pokedexIsReady"></loading-pokedex>
    <pokedex v-else></pokedex>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import LoadingPokedex from '@/components/LoadingPokedex'
  import Pokedex from '@/components/Pokedex/Pokedex'

  export default {
    name: 'poke-vue',
    components: {
      LoadingPokedex,
      Pokedex
    },
    computed: {
      ...mapGetters(['pokedexIsReady'])
    }
  }
</script>

<style lang="scss">
  .nav-tabs-navigation {
    margin-bottom: 10px;
  }
  .nav-tabs {
    list-style: none;
    margin: 0;
    padding: 0;

    .tab {
      display: inline-block;
      margin-right: 3px;

      a {
        background: $blue-lighter;
        color: $blue-dark;
        display: block;
        padding: 5px 12px;
        text-decoration: none;

        &.active_tab {
          background: $blue-light;
        }
      }

    }
  }

  #app {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
</style>

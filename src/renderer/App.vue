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
  @font-face {
    font-family: 'Muli', sans-serif;
    src: url('/static/fonts/Muli-Regular.ttf');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Muli', sans-serif;
    src: url('/static/fonts/Muli-Italic.ttf');
    font-weight: 400;
    font-style: italic;
  }
  @font-face {
    font-family: 'Muli', sans-serif;
    src: url('/static/fonts/Muli-Light.ttf');
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: 'Muli', sans-serif;
    src: url('/static/fonts/Muli-SemiBold.ttf');
    font-weight: 600;
    font-style: normal;
  }

  *, ::after, ::before {
    box-sizing: border-box;
  }

  body {
    font-family: 'Muli', sans-serif;
    font-weight: 400;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  dl, ol, ul {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  h1, h2, h3, h4, h5, h6 {
    cursor: default;
    font-weight: 600;
    user-select: none;
  }
</style>

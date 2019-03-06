<template>
  <div>
    <h2>Loading Pokedex Data...</h2>
    <div v-if="pokemonListIsLoading">
      <p>Loading Pokemon list...</p>
    </div>
    <p v-if="nbPokemonsInList != 0">{{ nbPokemonsInList }} Pokemons in the list</p>
    <p>{{ debug }}</p>
    <p><button type="button" @click="onResetData">Reset data</button></p>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState} from 'vuex'

  export default {
    name: 'loading-step',
    components: { },
    data: function () {
      return {
        debug: ''
      }
    },
    mounted () {
      this.debug += 'Start loading...'

      this.loadData()
    },
    computed: {
      ...mapGetters(['nbPokemonsInList']),
      ...mapState({
        pokedex: state => state.Pokedex,
        pokemonListIsLoading: state => state.Pokedex.pokemonListIsLoading
      })
    },
    methods: {
      ...mapActions(['loadPokemonApiLanguages', 'loadPokemonListNextPage', 'resetPokedexData']),
      ...{
        loadData () {
          if (Object.keys(this.pokedex.pokemonList).length < 150) {
            this.debug += ' Loading page...'
            this.loadPokemonListNextPage()
          } else if (this.pokedex.pokemonApiLanguages.length === 0) {
            this.debug += ' Loading languages...'
            this.loadPokemonApiLanguages()
          }
        },
        onResetData () {
          this.resetPokedexData()
        }
      }
    },
    watch: {
      pokedex: {
        handler: function (newPokedex, oldPokedex) {
          console.log(newPokedex, oldPokedex)
          // this.loadData()
        },
        deep: true
      }
    }
  }
</script>
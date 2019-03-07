<template>
  <div>
    <h2>Loading Pokedex Data...</h2>
    <div class="Loading steps">
      <ul>
        <li>
          Loading pokemon list
          <span v-if="pokedex.pokemonListCount != 0">
            ({{Object.keys(pokedex.pokemonList).length}}/{{pokedex.pokemonListCount}})
          </span>
        </li>
        <li>
          Loading languages list
          <span v-if="pokedex.pokemonApiLanguages.length != 0">
            ({{pokedex.pokemonApiLanguages.length}} languages found)
          </span>
        </li>
      </ul>
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
      // this.debug += 'Start loading...'

      this.loadData()
    },
    computed: {
      ...mapGetters(['nbPokemonsInList']),
      ...mapState({
        pokedex: state => state.Pokedex,
        pokedexIsLoading: state => state.Pokedex.pokedexIsLoading,
        pokemonListIsLoading: state => state.Pokedex.pokemonListIsLoading,
        pokemonLanguagesIsLoading: state => state.Pokedex.pokemonLanguagesIsLoading
      })
    },
    methods: {
      ...mapActions(['loadPokemonApiLanguages', 'loadPokemonListNextPage', 'resetPokedexData']),
      ...{
        loadData () {
          if (!this.pokedex.pokedexIsLoading) {
            if (this.pokedex.pokemonListCount === 0 ||
              Object.keys(this.pokedex.pokemonList).length < this.pokedex.pokemonListCount) {
              this.debug += ' Loading page...'
              this.loadPokemonListNextPage()
            } else if (this.pokedex.pokemonApiLanguages.length === 0) {
              this.debug += ' Loading languages...'
              this.loadPokemonApiLanguages()
            }
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
          this.loadData()
        },
        deep: true
      }
    }
  }
</script>
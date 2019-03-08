<template>
  <div class="loading-pokedex">
    <div class="loading-content">
      <h2>Preparing Pokedex</h2>
      <div class="loading-steps">
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
      <div class="actions">
        <button type="button" @click="onConfirmData">Launch Pokedex</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState} from 'vuex'

  export default {
    name: 'loading-pokedex',
    components: { },
    mounted () {
      this.loadData()
    },
    computed: {
      ...mapGetters(['pokedexIsReady', 'nbPokemonsInList']),
      ...mapState({
        pokedex: state => state.Pokedex,
        pokedexIsLoading: state => state.Pokedex.pokedexIsLoading,
        pokemonListIsLoading: state => state.Pokedex.pokemonListIsLoading,
        pokemonLanguagesIsLoading: state => state.Pokedex.pokemonLanguagesIsLoading
      })
    },
    methods: {
      ...mapActions(['confirmPokedexLoaded', 'loadPokemonApiLanguages', 'loadPokemonListNextPage', 'resetPokedexData']),
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
        onConfirmData () {
          this.confirmPokedexLoaded()
        },
        onResetData () {
          this.resetPokedexData()
        }
      }
    },
    watch: {
      pokedex: {
        handler: function (newPokedex, oldPokedex) {
          console.log(newPokedex)
          this.loadData()
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss">
  .loading-pokedex {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;

    .loading-content {
      text-align: center;

      .loading-steps {
        margin-bottom: 30px;
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin-bottom: 10px;
        }
      }

      .actions {
        text-align: center;

        button {
          display: block;
          margin: auto;
        }
      }
    }
  }
</style>

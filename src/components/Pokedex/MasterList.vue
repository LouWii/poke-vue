<template>
  <section class="pokemon-master-list">
    <h3>Pokémons</h3>
    <div class="filters-wrapper">
      <generations-dropdown/>
      <search-field/>
    </div>
    <div class="list-container">
      <ul>
        <li v-for="pokemon in getFilteredSpecies" :key="pokemon.id">
          <router-link :to="{name: 'pokemon', params: {id: pokemon.id}}">
            <translated-name :pokemon="pokemon"/>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import GenerationsDropdown from '@/components/List/GenerationsDropdown'
  import SearchField from '@/components/List/SearchField'
  import TranslatedName from '@/components/Pokemon/TranslatedName'

  export default {
    name: 'poke-master-list',
    components: {GenerationsDropdown, SearchField, TranslatedName},
    data: function() {
      return {
        pokemonList: []
      }
    },
    beforeMount: function() {
      this.getPokemonsSpecies()
        .then(rows => {
          this.pokemonList = rows
        })
        .catch(error => {
          console.error(error)
        })
    },
    computed: {
      ...mapGetters(['getFilteredSpecies']),
    },
    methods: {
      ...mapActions(['getPokemonsSpecies']),
      ...{
        onPokemonClick (event) {
          this.showPokemon(event.currentTarget.getAttribute('data-pokemon-id'))
        }
      }
    }
  }
</script>

<style lang="scss">
  .pokemon-master-list {
    .list-container {
      ul {
        list-style: none;
        margin: 0 10px;
        padding: 0;
        li {
          text-transform: capitalize;
          a {
            display: block;
            padding: 8px 4px;
            &:hover {
              background: #eee;
            }
          }
        }
      }
    }

    .filters-wrapper {
      margin: 1rem 0;
    }
  }
</style>
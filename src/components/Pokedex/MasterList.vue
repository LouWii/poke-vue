<template>
  <section class="pokemon-master-list">
    <h3>
      Pokémons
      <span>{{getFilteredSpecies.length}} results</span>
    </h3>
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
      this.getTypes()
      this.getPokemonsSpecies()
        .catch(error => {
          console.error(error)
        })
        setTimeout(function(){
          console.log(this.getFilteredSpecies)
        }.bind(this), 1500)
    },
    computed: {
      ...mapGetters(['getFilteredSpecies']),
    },
    methods: {
      ...mapActions(['getPokemonsSpecies', 'getTypes']),
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
    display: flex;
    flex-direction: column;
    height: 100%;

    h3 {
      display: flex;
      justify-content: space-between;
      margin: $margin-global $margin-global 0 $margin-global;
      span {
        font-weight: 400;
        font-size: $font-size-small;
      }
    }
    .list-container {
      overflow: auto;
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
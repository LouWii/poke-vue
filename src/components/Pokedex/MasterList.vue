<template>
  <section class="pokemon-master-list">
    <h3>Master List</h3>
    <div class="list-container">
      <ul>
        <li v-for="pokemon in pokemonList" :key="pokemon.id">
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
  import TranslatedName from '@/components/Pokemon/TranslatedName'

  export default {
    name: 'poke-master-list',
    components: {TranslatedName},
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
  }
</style>
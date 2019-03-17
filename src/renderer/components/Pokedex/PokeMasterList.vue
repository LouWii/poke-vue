<template>
  <section class="pokemon-master-list">
    <h3>Master List</h3>
    <div class="list-container">
      <ul>
        <li v-for="(pokemonId, pokemonName) in pokemonNamesList" :key="pokemonId">
          <a href="#" :data-pokemon-id="pokemonId" @click.prevent="onPokemonClick">{{ pokemonName }}</a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'poke-master-list',
    components: { },
    computed: {
      ...mapGetters(['pokemonNamesList'])
    },
    methods: {
      ...mapActions(['showPokemon']),
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
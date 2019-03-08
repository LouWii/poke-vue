<template>
  <section>
    <h3>Master List</h3>
    <div>
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
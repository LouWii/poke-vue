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
  import {mapGetters} from 'vuex'

  export default {
    name: 'poke-master-list',
    components: { },
    computed: {
      ...mapGetters(['pokemonNamesList'])
    },
    methods: {
      ...{
        onPokemonClick (event) {
          console.log(event.currentTarget.getAttribute('data-pokemon-id'))
        }
      }
    }
  }
</script>
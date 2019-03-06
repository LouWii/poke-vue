<template>
  <div>
    <ul>
      <li>Pokemons in DB: {{ pokemons.length }}</li>
      <li>Pokemon in list: {{ nbPokemonsInList }}</li>
    </ul>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState} from 'vuex'
  
  export default {
    name: 'loading-state',
    components: { },
    computed: {
      ...mapGetters(['nbPokemonsInList']),
      ...mapState({
        pokemons: state => state.Pokedex.pokemons
      })
    },
    mounted: function () {},
    methods: {
      ...mapActions(['loadPokemonListNextPage'])
    }
  }
</script>
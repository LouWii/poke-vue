<template>
  <section class="pokevue-container">
    <h3>Settings</h3>
    <div>
      <button type="button" @click="onDumpLanguages">Dump languages</button>
      <button type="button" @click="onDumpPokemonList">Dump pokemon list</button>
      <button type="button" @click="onDumpPokemonNames">Dump pokemon names</button>
      <button type="button" @click="onResetAllData">Reset all data</button>
    </div>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'poke-landing',
    components: { },
    computed: {
      ...mapState(['Pokedex'])
    },
    methods: {
      ...mapActions(['resetPokedexData']),
      ...{
        onDumpLanguages () {
          console.log(this.Pokedex.pokemonApiLanguages)
        },
        onDumpPokemonList () {
          console.log(this.Pokedex.pokemonList)
        },
        onDumpPokemonNames () {
          console.log(this.Pokedex.pokemonNames)
        },
        onResetAllData () {
          this.resetPokedexData()
        }
      }
    }
  }
</script>
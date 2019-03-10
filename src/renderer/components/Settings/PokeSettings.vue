<template>
  <section class="pokevue-container">
    <h3>Settings</h3>
    <div>
      <button type="button" @click="onDumpLanguages">Dump languages</button>
      <button type="button" @click="onDumpPokemonList">Dump pokemon list</button>
      <button type="button" @click="onDumpPokemonNames">Dump pokemon names</button>
      <button type="button" @click="onDumpPokemonDetails">Dump pokemon details</button>
      <button type="button" @click="onDumpPokemonVarieties">Dump pokemon varieties</button>
      <button type="button" @click="onDumpVersions">Dump versions</button>
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
      ...mapState(['Languages', 'Pokedex', 'Varieties', 'Versions'])
    },
    methods: {
      ...mapActions(['resetPokedexData']),
      ...{
        onDumpLanguages () {
          console.log(this.Languages.apiLanguages)
        },
        onDumpPokemonList () {
          console.log(this.Pokedex.pokemonList)
        },
        onDumpPokemonDetails () {
          console.log(this.Pokedex.pokemonDetails)
        },
        onDumpPokemonNames () {
          console.log(this.Pokedex.pokemonNames)
        },
        onDumpPokemonVarieties () {
          console.log(this.Varieties.varieties)
        },
        onDumpVersions () {
          console.log(this.Versions.versions)
        },
        onResetAllData () {
          this.resetPokedexData()
        }
      }
    }
  }
</script>
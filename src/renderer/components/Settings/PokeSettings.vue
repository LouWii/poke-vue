<template>
  <section class="pokedex-settings">
    <button class="close clear" @click="onCloseSettings" title="Close">
      <font-awesome-icon icon="times"/>
    </button>
    <vue-tabs>
      <v-tab title="General">
        <label>Language</label>
      </v-tab>

      <v-tab title="Stats">
        <p><strong>Pokemons in list:</strong> {{Object.keys(this.Pokedex.pokemonList).length}}</p>
        <p><strong>Pokemons details cached:</strong> {{Object.keys(this.Pokedex.pokemonDetails).length}}</p>
        <p><strong>Pokemon varieties details cached:</strong> {{Object.keys(this.Varieties.varieties).length}}</p>
        <p><strong>Versions details cached:</strong> {{Object.keys(this.Versions.versions).length}}</p>
        <p><strong>Version groups details cached:</strong> {{Object.keys(this.VersionGroups.versionGroups).length}}</p>
        <p><strong>Languages available:</strong> {{Object.keys(this.Languages.apiLanguages).length}}</p>
        <p><strong>Translated Pokemon Names:</strong> {{languagesPokemonList}}</p>
      </v-tab>

      <v-tab title="Debug">
        <button type="button" @click="onDumpLanguages">Dump languages</button>
        <button type="button" @click="onDumpPokemonList">Dump pokemon list</button>
        <button type="button" @click="onDumpPokemonNames">Dump pokemon names</button>
        <button type="button" @click="onDumpPokemonDetails">Dump pokemon details</button>
        <button type="button" @click="onDumpPokemonVarieties">Dump pokemon varieties</button>
        <button type="button" @click="onDumpVersions">Dump versions</button>
        <button type="button" @click="onDumpVersionGroups">Dump version groups</button>
        <button type="button" @click="onResetAllData">Reset all data</button>
      </v-tab>
    </vue-tabs>
  </section>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'poke-landing',
    components: { },
    computed: {
      ...mapState(['Languages', 'Pokedex', 'Varieties', 'Versions', 'VersionGroups']),
      ...{
        languagesPokemonList () {
          let listStr = ''
          Object.keys(this.Pokedex.pokemonNames).forEach(lang => {
            listStr += lang + ': ' + Object.keys(this.Pokedex.pokemonNames[lang]).length + '; '
          })
          return listStr
        }
      }
    },
    methods: {
      ...mapActions(['closeSettingsPanel', 'resetPokedexData']),
      ...{
        onCloseSettings () {
          this.closeSettingsPanel()
        },
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
        onDumpVersionGroups () {
          console.log(this.VersionGroups.versionGroups)
        },
        onResetAllData () {
          this.resetPokedexData()
        }
      }
    }
  }
</script>

<style lang="scss">
  .pokedex-settings {
    .close {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
</style>
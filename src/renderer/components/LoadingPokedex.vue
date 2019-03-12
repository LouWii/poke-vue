<template>
  <div class="loading-pokedex">
    <div class="loading-content">
      <h2 v-if="!pokedexReadyToConfirm">Preparing Pokedex</h2>
      <h2 v-else>Pokedex Ready!</h2>
      <div class="intro-text">
        We're pre-fetching some data in order to prepare your Pokedex. This only occurs on first launch.
      </div>
      <div class="loading-steps">
        <ul>
          <li>
            Loading pokemon list
            <span v-if="pokedex.pokemonListCount != 0">
              ({{Object.keys(pokedex.pokemonList).length}}/{{pokedex.pokemonListCount}})
            </span>
          </li>
          <li>
            Loading languages list
            <span v-if="languages.apiLanguages.length != 0">
              ({{languages.apiLanguages.length}} languages found)
            </span>
          </li>
          <li>
            Loading versions
            <span v-if="versions.versionsListCount != 0">
              ({{Object.keys(versions.versions).length}}/{{versions.versionsListCount}})
            </span>
          </li>
          <li>
            Loading version groups
            <span v-if="versionGroups.versionGroupsListCount != 0">
              ({{Object.keys(versionGroups.versionGroups).length}}/{{versionGroups.versionGroupsListCount}})
            </span>
          </li>
        </ul>
      </div>
      <div class="actions">
        <button v-if="pokedexReadyToConfirm" type="button" @click="onConfirmData">Launch Pokedex</button>
        <button v-if="showReset" type="button" @click="onResetData">Reset data</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapState} from 'vuex'

  export default {
    name: 'loading-pokedex',
    components: { },
    data: function () {
      return {
        showReset: false,
        showResetTimeout: null
      }
    },
    mounted () {
      this.showResetTimeout = setTimeout(function () { this.showReset = true }.bind(this), 5000)

      this.loadData()
    },
    computed: {
      ...mapGetters(['pokedexReadyToConfirm', 'nbPokemonsInList']),
      ...mapState({
        pokedex: state => state.Pokedex,
        languages: state => state.Languages,
        versions: state => state.Versions,
        versionGroups: state => state.VersionGroups,
        versionsList: state => state.Versions.versionsList,
        pokedexIsLoading: state => state.Pokedex.pokedexIsLoading,
        pokemonListIsLoading: state => state.Pokedex.pokemonListIsLoading,
        pokemonLanguagesIsLoading: state => state.Pokedex.pokemonLanguagesIsLoading
      })
    },
    methods: {
      ...mapActions([
        'confirmPokedexLoaded',
        'loadApiLanguages',
        'loadVersionList',
        'loadAllVersions',
        'loadVersionGroupsList',
        'loadAllVersionGroups',
        'loadPokemonListNextPage',
        'resetPokedexData'
      ]),
      ...{
        loadData () {
          if (this.pokedexReadyToConfirm) {
            clearTimeout(this.showResetTimeout)
          }

          if (!this.pokedex.pokedexIsLoading) {
            console.log(this.versions.versionsList)
            if (this.pokedex.pokemonListCount === 0 ||
              Object.keys(this.pokedex.pokemonList).length < this.pokedex.pokemonListCount) {
              this.debug += ' Loading page...'
              this.loadPokemonListNextPage()
            } else if (this.languages.apiLanguages.length === 0) {
              this.debug += ' Loading languages...'
              this.loadApiLanguages()
            } else if (Object.keys(this.versions.versionsList).length === 0) {
              this.loadVersionList()
            } else if (Object.keys(this.versions.versions).length === 0) {
              this.loadAllVersions()
            } else if (Object.keys(this.versionGroups.versionGroupsList).length === 0) {
              this.loadVersionGroupsList()
            } else if (Object.keys(this.versionGroups.versionGroups).length === 0) {
              this.loadAllVersionGroups()
            }
          }
        },
        onConfirmData () {
          this.confirmPokedexLoaded()
        },
        onResetData () {
          this.resetPokedexData()
        }
      }
    },
    watch: {
      pokedex: {
        handler: function (newPokedex, oldPokedex) {
          // console.log(newPokedex)
          this.loadData()
        },
        deep: true
      },
      versionsList: (newVersionsList, oldversionsList) => {
        console.log(newVersionsList)
        this.loadData()
      }
    }
  }
</script>

<style lang="scss">
  .loading-pokedex {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    .loading-content {
      text-align: center;

      .loading-steps {
        margin-bottom: 30px;
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin-bottom: 10px;
        }
      }

      .intro-text {

      }

      .actions {
        text-align: center;

        button {
          display: block;
          margin: auto;
        }
      }
    }
  }
</style>

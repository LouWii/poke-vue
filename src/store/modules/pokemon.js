import Vue from 'vue'
import pokeDb from '@/database'
import * as db from '@/database'

const getInitialState = () => {
  return {
    versions: [],
  }
}

const state = getInitialState()

const getters = {}

const actions = {
  /**
   * Very few pokemon have more than 1 form
   * @param {*} param0 
   * @param {*} payload 
   */
  getPokemonForms({rootState}) {
    pokeDb.all(
      ``,
      {$langId: rootState.settings.userLanguage}
    )
  },
  getPokemons({rootState}) {
    return new Promise((resolve, reject) => {
      pokeDb.all(
        `SELECT p.* FROM ${db.dbtablePokemon} AS p
        ORDER BY s."order" ASC`,
        {$langId: rootState.settings.userLanguage},
        (error, rows) => {
          if (error) {
            reject(error)
          } else {
            resolve(rows)
          }
        }
      )
    })
  },
  getPokemonsSpecies({rootState}) {
    return new Promise((resolve, reject) => {
      pokeDb.all(
        `SELECT s.*, n.name AS t_name FROM ${db.dbtablePokemonSpecies} AS s 
        LEFT OUTER JOIN ${db.dbtablePokemonSpeciesName} AS n ON n.pokemon_species_id = s.id
        WHERE n.language_id = $langId
        ORDER BY s."order" ASC`,
        {$langId: rootState.settings.userLanguage},
        (error, rows) => {
          if (error) {
            reject(error)
          } else {
            resolve(rows)
          }
        }
      )
    })
  },
  getPokemonSpecies({rootState}, speciesId) {
    return new Promise((resolve, reject) => {
      pokeDb.get(
        `SELECT s.*, n.name AS t_name FROM ${db.dbtablePokemonSpecies} AS s 
        LEFT OUTER JOIN ${db.dbtablePokemonSpeciesName} AS n ON n.pokemon_species_id = s.id
        WHERE n.language_id = $langId AND s.id = $id`,
        {$langId: rootState.settings.userLanguage, $id: speciesId},
        (error, rows) => {
          if (error) {
            reject(error)
          } else {
            resolve(rows)
          }
        }
      )
    })
  },
  /**
   * Get all flavored text of a Species.
   * Note: when working with translations, the flavor text from old versions are available only in english
   * @param {*} param0 
   * @param {int} speciesId 
   */
  getPokemonSpeciesFlavorTexts({rootState}, speciesId) {
    return new Promise((resolve, reject) => {
      pokeDb.all(
        `SELECT t.*, tt.flavor_text as t_flavor_text
        FROM ${db.dbtablePokemonSpeciesFlavorText} AS t
        LEFT JOIN pokemon_v2_pokemonspeciesflavortext AS tt 
        ON tt.pokemon_species_id = t.pokemon_species_id AND tt.version_id = t.version_id AND (tt.language_id = $langId OR tt.language_id IS NULL)
        WHERE t.language_id = $englishLangId AND t.pokemon_species_id = $id`,
        {$langId: rootState.settings.userLanguage, $englishLangId: rootState.settings.englishLanguage, $id: speciesId},
        (error, rows) => {
          if (error) {
            reject(error)
          } else {
            resolve(rows)
          }
        }
      )
    })
  },
  getVersions({commit, rootState}, payload) {
    return new Promise((resolve, reject) => {
      if (rootState.pokemon.versions.length) {
        if (payload.ids) {
          resolve(rootState.pokemon.versions.filter(curV => ~payload.ids.indexOf(curV.id)))
        } else {
          resolve(rootState.pokemon.versions)
        }
      } else {
        pokeDb.all(
          `SELECT v.*, n.name AS t_name FROM ${db.dbtablePokemonVersion} AS v
          LEFT OUTER JOIN ${db.dbtablePokemonVersionName} AS n ON v.id = n.version_id
          WHERE n.language_id = $langId`,
          {$langId: rootState.settings.userLanguage},
          (error, rows) => {
            if (error) {
              reject(error)
            } else {
              commit('SET_VERSIONS', rows)
              if (payload.ids) {
                resolve(rows.filter(curV => ~payload.ids.indexOf(curV.id)))
              } else {
                resolve(rows)
              }
            }
          }
        )
      }
    })
  }
}

const mutations = {
  SET_VERSIONS(state, versions) {
    Vue.set(state, 'versions', versions)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
import Vue from 'vue'
import pokeDb from '@/database'
import * as db from '@/database'
import {buildQueryFilter} from '@/utils/query'

const getInitialState = () => {
  return {
    generations: [], // Contains ALL generations, or none
    species: [], // Contains ALL species, or none
    versions: [], // Contains ALL versions, or none
    generationsVersionIds: [], // Contains ALL version Ids for all generation Ids
    moveLearnMethods: [], // Contains ALL move learn methods, or none

    partialMoves: [],
    partialPokemonMoves: [], // Contains ALL PokemonMoves for a Pokemon Variety id
  }
}

const state = getInitialState()

const getters = {
  allGenerations: state => state.generations,
  allGenerationsVersionIds: state => state.generationsVersionIds,
  allSpecies: state => state.species,
  allVersions: state => state.versions,
  versionsFromVersionGroup: state => versionGroupId => state.versions.filter(version => version.version_group_id === versionGroupId),
  generationVersionsName: state => generationId => {
    const versionsName = []
    if (state.generationsVersionIds[generationId]) {
      state.generationsVersionIds[generationId]
        .forEach(
          vId => versionsName.push(
            state.versions.find(curV => curV.id === vId).t_name
          )
        )
    }
    return versionsName
  },
  pokemonMoves: state => pokemonId => {
    return state.partialPokemonMoves[pokemonId]?state.partialPokemonMoves[pokemonId]:[]
  }
}

const actions = {
  getGenerations({commit, rootState}) {
    return new Promise((resolve, reject) => {
      if (rootState.pokemon.generations.length) {
        return rootState.pokemon.generations
      } else {
        pokeDb.all(
          `SELECT g.*, n.name AS t_name FROM ${db.dbtableGeneration} AS g
          LEFT OUTER JOIN ${db.dbtableGenerationName} AS n ON n.generation_id = g.id
          WHERE n.language_id = $langId
          ORDER BY g."id" ASC`,
          {$langId: rootState.settings.userLanguage},
          (error, rows) => {
            if (error) {
              reject(error)
            } else {
              commit('SET_GENERATIONS', rows)
              resolve(rows)
            }
          }
        )
      }
    })
  },
  getGenerationsVersions({commit, dispatch, getters}) {
    return new Promise((resolve, reject) => {
      // Fetch all versions before doing anything
      dispatch('getVersions')
        .then(function() {
          pokeDb.all(
            `SELECT g.* FROM ${db.dbtableVersionGroup} AS g
            ORDER BY g."order"`,
            {},
            (error, rows) => {
              if (error) {
                reject(error)
              } else {
                const generationsVersionIds = []
                rows.forEach(row => {
                  if (!generationsVersionIds[row.generation_id]) {
                    generationsVersionIds[row.generation_id] = []
                  }
                  // Find the versions from that gen
                  getters.versionsFromVersionGroup(row.id).forEach(version => generationsVersionIds[row.generation_id].push(version.id))
                })
                commit('SET_GENERATIONS_VERSIONS_IDS', generationsVersionIds)
              }
            }
          )
        })
    })
  },
  getMove({rootState}, moveId) {
    return new Promise((resolve, reject) => {
      if (rootState.pokemon.moves[moveId]) {
        resolve(rootState.pokemon.moves[moveId])
      } else {
        pokeDb.get(
          `SELECT m.* FROM ${dbtableMove} AS m
          WHERE id = $moveId`,
          {$moveId: moveId},
          (error, row) => {
            if (error) {
              reject(error)
            } else {
              resolve(row)
            }
          }
        )
      }
    })
  },
  getMoveLearnMethods({rootState}) {
    return new Promise((resolve, reject) => {
      if (rootState.pokemon.moveLearnMethods.length) {
        resolve(rootState.pokemon.moveLearnMethods.length)
      } else {
        pokeDb.all(
          `SELECT m.* FROM ${dbtableMoveLearnMethod} AS m
          LEFT OUTER JOIN ${dbtableMoveLearnMethodName} AS t
          ON m.id = t.move_learn_method_id AND (t.language_id = ${langId} OR t.language_id IS NULL)`,
          {$langId: rootState.settings.userLanguage},
          (error, rows) => {
            if (error) {
              reject(error)
            } else {
              
              resolve(rows)
            }
          }
        )
      }
    })
  },
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
  getPokemons({rootState}, payload) {
    return new Promise((resolve, reject) => {
      let queryParameters = {}
      let extraConditions = ''
      if (payload.filters) {
        let result = buildQueryFilter(payload.filters)
        queryParameters = Object.assign({}, result.queryParameters)
        if (result.query.length) {
          extraConditions += ' WHERE (' + result.query + ')'
        }
      }
      pokeDb.all(
        `SELECT p.* FROM ${db.dbtablePokemon} AS p
        ${extraConditions}
        ORDER BY p."order" ASC`,
        queryParameters,
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
  getPokemonMoves({commit}, pokemonId) {
    return new Promise((resolve, reject) => {
      pokeDb.all(
        `SELECT m.* FROM ${db.dbtablePokemonMove} AS m
        WHERE pokemon_id = $pokemonId`,
        {$pokemonId: pokemonId},
        (error, rows) => {
          if (error) {
            reject(error)
          } else {
            commit('ADD_POKEMON_MOVES', {pokemonId: pokemonId, moves: rows})
            resolve(rows)
          }
        }
      )
    })
  },
  getPokemonSprites(context, pokemonId) {
    return new Promise((resolve, reject) => {
      pokeDb.get(
        `SELECT s.* FROM ${db.dbtablePokemonSprites} AS s 
        WHERE s.pokemon_id = $id`,
        {$id: pokemonId},
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
  getPokemonsSpecies({commit, rootState}) {
    return new Promise((resolve, reject) => {
      if (rootState.pokemon.species.length) {
        resolve(rootState.pokemon.species)
      } else {
        pokeDb.all(
          `SELECT s.*, n.name AS t_name FROM ${db.dbtablePokemonSpecies} AS s 
          LEFT OUTER JOIN ${db.dbtablePokemonSpeciesName} AS n
          ON n.pokemon_species_id = s.id AND (n.language_id = $langId OR n.language_id IS NULL)
          ORDER BY s."order" ASC`,
          {$langId: rootState.settings.userLanguage},
          (error, rows) => {
            if (error) {
              reject(error)
            } else {
              commit('SET_SPECIES', rows)
              resolve(rows)
            }
          }
        )
      }
    })
  },
  getPokemonSpecies({rootState}, speciesId) {
    return new Promise((resolve, reject) => {
      if (rootState.pokemon.species.length) {
        resolve(rootState.pokemon.species.find(species => species.id === speciesId))
      } else {
        pokeDb.get(
          `SELECT s.*, n.name AS t_name FROM ${db.dbtablePokemonSpecies} AS s 
          LEFT OUTER JOIN ${db.dbtablePokemonSpeciesName} AS n
          ON n.pokemon_species_id = s.id AND (n.language_id = $langId or n.language_id IS NULL)
          WHERE s.id = $id`,
          {$langId: rootState.settings.userLanguage, $id: speciesId},
          (error, rows) => {
            if (error) {
              reject(error)
            } else {
              resolve(rows)
            }
          }
        )
      }
      
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
        if (payload && payload.ids) {
          resolve(rootState.pokemon.versions.filter(curV => ~payload.ids.indexOf(curV.id)))
        } else {
          resolve(rootState.pokemon.versions)
        }
      } else {
        pokeDb.all(
          // BUG: should fetch english name if translation doesn't exist
          `SELECT v.*, n.name AS t_name FROM ${db.dbtableVersion} AS v
          LEFT OUTER JOIN ${db.dbtableVersionName} AS n 
          ON v.id = n.version_id AND (n.language_id = $langId OR n.language_id IS NULL)`,
          {$langId: rootState.settings.userLanguage},
          (error, rows) => {
            if (error) {
              reject(error)
            } else {
              commit('SET_VERSIONS', rows)
              if (payload && payload.ids) {
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
  ADD_MOVE(state, payload) {
    Vue.set(state.partialMoves, payload.moveId, payload.move)
  },
  ADD_POKEMON_MOVES(state, payload) {
    Vue.set(state.partialPokemonMoves, payload.pokemonId, payload.moves)
  },
  SET_GENERATIONS(state, generations) {
    Vue.set(state, 'generations', generations)
  },
  SET_GENERATIONS_VERSIONS_IDS(state, generationsVersionIds) {
    Vue.set(state, 'generationsVersionIds', generationsVersionIds)
  },
  SET_SPECIES(state, species) {
    Vue.set(state, 'species', species)
  },
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
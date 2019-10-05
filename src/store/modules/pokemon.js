import Vue from 'vue'
import pokeDb from '@/database'
import * as db from '@/database'
import {buildQueryFilter} from '@/utils/query'

const getInitialState = () => {
  return {
    generations: [], // Contains ALL generations, or none
    generationsVersionIds: [], // Contains ALL version Ids for all generation Ids
    moveLearnMethods: [], // Contains ALL move learn methods, or none
    moveTargets: [], // Contains ALL move targets, or none
    species: [], // Contains ALL species, or none
    types: [], // Contains ALL types, or none
    versions: [], // Contains ALL versions, or none

    partialMoves: [], // Contains moves (stored here when fetched, one at a time)
    partialMoveTargetDescription: [], // Contains Move Target Description (stored here when fetched, one at a time); key is the move target id
    partialPokemonMoves: [], // Contains all PokemonMoves for each Pokemon Variety id (when we fetch for a variety id)
    partialSpeciesToDefaultVariety: [], // Contains species id as key, its default variety as value
  }
}

const state = getInitialState()

const getters = {
  allGenerations: state => state.generations,
  allGenerationsVersionIds: state => state.generationsVersionIds,
  allMoveLearnMethods: state => state.moveLearnMethods,
  allMoveTargets: state => state.moveTargets,
  allSpecies: state => state.species,
  allTypes: state => state.types,
  allVersions: state => state.versions,
  versionsFromVersionGroup: state => versionGroupId => state.versions.filter(version => version.version_group_id === versionGroupId),
  generation: state => generationId => state.generations.find(g => g.id === generationId),
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
  moveLearnMethod: state => moveLearnMethodId => state.moveLearnMethods.find(mlMethod => mlMethod.id === moveLearnMethodId),
  movesFromIds: state => moveIds => {
    const tempArr = []
    moveIds.forEach(mId => {tempArr.push(state.partialMoves[mId])})
    return tempArr
  },
  moveTarget: state => moveTargetId => state.moveTargets.find(mt => mt.id === moveTargetId),
  pokemonMoves: state => pokemonId => state.partialPokemonMoves[pokemonId]?state.partialPokemonMoves[pokemonId]:[],
  type: state => typeId => state.types.find(type => type.id === typeId)
}

const actions = {
  getEvolutionChainSpecies({dispatch, rootState}, evolutionChainId) {
    return new Promise((resolve, reject) => {
      if (rootState.pokemon.species.length) {
        const evChainSpecies = rootState.pokemon.species.filter(species => species.evolution_chain_id === evolutionChainId).sort((sA, sB) => sA.order < sB.order)
        resolve (evChainSpecies)
      } else {
        dispatch('getPokemonsSpecies').then(function() {
          const evChainSpecies = rootState.pokemon.species.filter(species => species.evolution_chain_id === evolutionChainId)
          resolve (evChainSpecies)
        })
        .catch(error => {
          reject(error)
        })
      }
    })
  },
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
  getGenerationsVersions({commit, dispatch, getters, rootState}) {
    return new Promise((resolve, reject) => {
      // Fetch all versions before doing anything
      dispatch('getVersions')
        .then(function() {
          if (rootState.pokemon.generationsVersionIds.length) {
            
          } else {
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
          }
        })
    })
  },
  getMove({rootState}, moveId) {
    return new Promise((resolve, reject) => {
      if (rootState.pokemon.partialMoves[moveId]) {
        resolve(rootState.pokemon.partialMoves[moveId])
      } else {
        pokeDb.get(
          `SELECT m.*, t.name AS t_name FROM ${db.dbtableMove} AS m
          LEFT OUTER JOIN ${db.dbtableMoveName} AS t ON m.id = t.move_id AND (t.language_id = $langId OR t.language_id IS NULL)
          WHERE m.id = $moveId`,
          {$langId: rootState.settings.userLanguage, $moveId: moveId},
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
  getMovesFromIds({commit, getters, rootState}, moveIds) {
    return new Promise((resolve, reject) => {
      const idsToFetch = []
      moveIds.forEach(moveId => {
        if (!rootState.pokemon.partialMoves[moveId]) idsToFetch.push(moveId)
      })

      if (idsToFetch.length) {
        const idsStr = idsToFetch.join(', ')
        pokeDb.all(
          `SELECT m.*, t.name AS t_name FROM ${db.dbtableMove} AS m
          LEFT OUTER JOIN ${db.dbtableMoveName} AS t ON m.id = t.move_id AND (t.language_id = $langId OR t.language_id IS NULL)
          WHERE m.id IN (${idsStr})`,
          {$langId: rootState.settings.userLanguage},
          (error, rows) => {
            if (error) {
              reject(error)
            } else {
              rows.forEach(row => {commit('ADD_MOVE', row)})
              resolve(getters.movesFromIds(moveIds))
            }
          }
        )
      } else {
        resolve(getters.movesFromIds(moveIds))
      }
    })
  },
  getMoveLearnMethods({commit, rootState}) {
    return new Promise((resolve, reject) => {
      if (rootState.pokemon.moveLearnMethods.length) {
        resolve(rootState.pokemon.moveLearnMethods)
      } else {
        pokeDb.all(
          `SELECT m.*, t.name AS t_name FROM ${db.dbtableMoveLearnMethod} AS m
          LEFT OUTER JOIN ${db.dbtableMoveLearnMethodName} AS t
          ON m.id = t.move_learn_method_id AND (t.language_id = $langId OR t.language_id IS NULL)`,
          {$langId: rootState.settings.userLanguage},
          (error, rows) => {
            if (error) {
              reject(error)
            } else {
              commit('SET_MOVE_LEARN_METHODS', rows)
              resolve(rows)
            }
          }
        )
      }
    })
  },
  getMoveTargetDescription({commit, rootState}, moveTargetId) {
    return new Promise((resolve, reject) => {
      if (rootState.pokemon.partialMoveTargetDescription[moveTargetId]) {
        resolve(rootState.pokemon.partialMoveTargetDescription[moveTargetId])
      } else {
        pokeDb.get(
          `SELECT td.*, tdt.description AS t_description FROM ${db.dbtableMoveTargetDescription} AS td
          LEFT JOIN ${db.dbtableMoveTargetDescription} AS tdt 
          ON tdt.move_target_id = td.move_target_id AND (tdt.language_id = $langId OR tdt.language_id IS NULL)
          WHERE td.move_target_id = $moveTargetId AND td.language_id = $englishLangId`,
          {$langId: rootState.settings.userLanguage, $englishLangId: rootState.settings.englishLanguage, $moveTargetId: moveTargetId},
          (error, row) => {
            if (error) {
              reject(error)
            } else {
              commit('ADD_MOVE_TARGET_DESCRIPTION', row)
              resolve(row)
            }
          }
        )
      }
    })
  },
  getMoveTargets({commit, rootState}) {
    return new Promise((resolve, reject) => {
      if (rootState.pokemon.moveTargets.length) {
        resolve(rootState.pokemon.moveTargets)
      } else {
        pokeDb.all(
          `SELECT mt.*, mtt.name AS t_name FROM ${db.dbtableMoveTarget} AS mt
          LEFT OUTER JOIN ${db.dbtableMoveTargetName} AS mtt
          ON mt.id = mtt.move_target_id AND (mtt.language_id = $langId OR mtt.language_id IS NULL)`,
          {$langId: rootState.settings.userLanguage},
          (error, rows) => {
            if (error) {
              reject(error)
            } else {
              commit('SET_MOVE_TARGETS', rows)
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
  getPokemonMoves({commit, getters}, pokemonId) {
    return new Promise((resolve, reject) => {
      if (getters.pokemonMoves[pokemonId]) {
        resolve(getters.pokemonMoves[pokemonId])
      } else {
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
      }
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
        LEFT JOIN ${db.dbtablePokemonSpeciesFlavorText} AS tt 
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
  getSpeciesDefaultVariety({commit, rootState}, speciesId) {
    return new Promise((resolve, reject) => {
      if (rootState.pokemon.partialSpeciesToDefaultVariety[speciesId]) {
        resolve(rootState.pokemon.partialSpeciesToDefaultVariety[speciesId])
      } else {
        pokeDb.get(
          `SELECT p.id
          FROM ${db.dbtablePokemon} AS p
          WHERE p.pokemon_species_id = $speciesId AND p.is_default = $default`,
          {$speciesId: speciesId, $default: 1},
          (error, row) => {
            if (error) {
              reject(error)
            } else {
              commit('ADD_SPECIES_DEFAULT_VARIETY', {speciesId, varietyId: row.id})
              resolve(row.id)
            }
          }
        )
      }
    })
  },
  getTypes({commit, rootState}) {
    return new Promise((resolve, reject) => {
      if (rootState.pokemon.types.length) {
        resolve(rootState.pokemon.types)
      } else {
        pokeDb.all(
          // BUG: should fetch english name if translation doesn't exist
          `SELECT t.*, n.name AS t_name FROM ${db.dbtableType} AS t
          LEFT OUTER JOIN ${db.dbtableTypeName} AS n 
          ON t.id = n.type_id AND (n.language_id = $langId OR n.language_id IS NULL)`,
          {$langId: rootState.settings.userLanguage},
          (error, rows) => {
            if (error) {
              reject(error)
            } else {
              commit('SET_TYPES', rows)
              resolve(rows)
            }
          }
        )
      }
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
  ADD_MOVE(state, move) {
    Vue.set(state.partialMoves, move.id, move)
  },
  ADD_MOVE_TARGET_DESCRIPTION(state, moveTargetDescription) {
    Vue.set(
      state.partialMoveTargetDescription,
      moveTargetDescription.move_target_id,
      moveTargetDescription)
  },
  ADD_POKEMON_MOVES(state, payload) {
    Vue.set(state.partialPokemonMoves, payload.pokemonId, payload.moves)
  },
  ADD_SPECIES_DEFAULT_VARIETY(state, payload) {
    Vue.set(state.partialSpeciesToDefaultVariety, payload.speciesId, payload.varietyId)
  },
  SET_GENERATIONS(state, generations) {
    Vue.set(state, 'generations', generations)
  },
  SET_GENERATIONS_VERSIONS_IDS(state, generationsVersionIds) {
    Vue.set(state, 'generationsVersionIds', generationsVersionIds)
  },
  SET_MOVE_LEARN_METHODS(state, moveLearnMethods) {
    Vue.set(state, 'moveLearnMethods', moveLearnMethods)
  },
  SET_MOVE_TARGETS(state, moveTargets) {
    Vue.set(state, 'moveTargets', moveTargets)
  },
  SET_SPECIES(state, species) {
    Vue.set(state, 'species', species)
  },
  SET_TYPES(state, types) {
    Vue.set(state, 'types', types)
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
import pokeDb, {dbtablePokemon, dbtablePokemonSpecies, dbtablePokemonSpeciesName} from '@/database'

const getInitialState = () => {
  return {
    
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
  getPokemonForms({rootState}, payload) {
    pokeDb.all(
      ``,
      {$langId: rootState.settings.userLanguage}
    )
  },
  getPokemons({rootState}, payload) {
    return new Promise((resolve, reject) => {
      pokeDb.all(
        `SELECT p.* FROM ${dbtablePokemon} AS p
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
  getPokemonsSpecies({rootState}, payload) {
    return new Promise((resolve, reject) => {
      pokeDb.all(
        `SELECT s.* FROM ${dbtablePokemonSpecies} AS s 
        LEFT OUTER JOIN ${dbtablePokemonSpeciesName} AS n ON n.pokemon_species_id = s.id
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
        `SELECT s.* FROM ${dbtablePokemonSpecies} AS s 
        LEFT OUTER JOIN ${dbtablePokemonSpeciesName} AS n ON n.pokemon_species_id = s.id
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
  }
}

const mutations = {
  
}

export default {
  state,
  getters,
  actions,
  mutations
}
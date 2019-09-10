import pokeDb, {dbtablePokemonSpecies, dbtablePokemonSpeciesName} from '@/database'

const getInitialState = () => {
  return {
    
  }
}

const state = getInitialState()

const getters = {}

const actions = {
  getPokemons({rootState}, payload) {
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
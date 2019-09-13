import sqlite3 from 'sqlite3'

const pokeDb = new sqlite3.cached.Database('db.sqlite3')

export default pokeDb

const dbTablePrefix = 'pokemon_v2_'
export const dbtablePokemon                   = dbTablePrefix + 'pokemon'
// Only 20 pkmn have more than 1 form
export const dbtablePokemonForm               = dbTablePrefix + 'pokemonform'
export const dbtableGeneration                = dbTablePrefix + 'generation'
export const dbtableGenerationName            = dbTablePrefix + 'generationname'
export const dbtableMove                      = dbTablePrefix + 'move'
export const dbtableMoveName                  = dbTablePrefix + 'movename'
export const dbtablePokemonSpecies            = dbTablePrefix + 'pokemonspecies'
export const dbtablePokemonSpeciesDescription = dbTablePrefix + 'pokemonspeciesdescription'
export const dbtablePokemonSpeciesFlavorText  = dbTablePrefix + 'pokemonspeciesflavortext'
export const dbtablePokemonSpeciesName        = dbTablePrefix + 'pokemonspeciesname'
export const dbtablePokemonSprites            = dbTablePrefix + 'pokemonsprites'
export const dbtablePokemonVersion            = dbTablePrefix + 'version'
export const dbtablePokemonVersionGroup       = dbTablePrefix + 'versiongroup'
export const dbtablePokemonVersionName        = dbTablePrefix + 'versionname'

export const dbCallback = (resolve, reject, error, rows) => {
  if (error) {
    reject(error)
  } else {
    resolve(rows)
  }
}
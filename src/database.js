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
export const dbtableMoveLearnMethod           = dbTablePrefix + 'movelearnmethod'
export const dbtableMoveLearnMethodName       = dbTablePrefix + 'movelearnmethodname'
export const dbtableMoveName                  = dbTablePrefix + 'movename'
export const dbtablePokemonMove               = dbTablePrefix + 'pokemonmove'
export const dbtablePokemonSpecies            = dbTablePrefix + 'pokemonspecies'
export const dbtablePokemonSpeciesDescription = dbTablePrefix + 'pokemonspeciesdescription'
export const dbtablePokemonSpeciesFlavorText  = dbTablePrefix + 'pokemonspeciesflavortext'
export const dbtablePokemonSpeciesName        = dbTablePrefix + 'pokemonspeciesname'
export const dbtablePokemonSprites            = dbTablePrefix + 'pokemonsprites'
export const dbtableType                      = dbTablePrefix + 'type'
export const dbtableTypeName                  = dbTablePrefix + 'typename'
export const dbtableVersion                   = dbTablePrefix + 'version'
export const dbtableVersionGroup              = dbTablePrefix + 'versiongroup'
export const dbtableVersionName               = dbTablePrefix + 'versionname'

export const dbCallback = (resolve, reject, error, rows) => {
  if (error) {
    reject(error)
  } else {
    resolve(rows)
  }
}
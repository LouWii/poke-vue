import sqlite3 from 'sqlite3'

const pokeDb = new sqlite3.Database('db.sqlite3')

export default pokeDb

const dbTablePrefix = 'pokemon_v2_'
export const dbtablePokemon            = dbTablePrefix + 'pokemon'
export const dbtablePokemonForm        = dbTablePrefix + 'pokemonform'
export const dbtablePokemonSpecies     = dbTablePrefix + 'pokemonspecies'
export const dbtablePokemonSpeciesName = dbTablePrefix + 'pokemonspeciesname'

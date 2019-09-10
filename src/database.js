import sqlite3 from 'sqlite3'

const pokeDb = new sqlite3.Database('db.sqlite3')

export default pokeDb

export const dbtablePokemonSpecies = 'pokemon_v2_pokemonspecies'
export const dbtablePokemonSpeciesName = 'pokemon_v2_pokemonspeciesname'
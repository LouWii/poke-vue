// PokeAPI JS Wrapper: https://github.com/PokeAPI/pokeapi-js-wrapper
const Pokedex = require('pokeapi-js-wrapper')

const pokeApi = new Pokedex.Pokedex()

export default pokeApi

export const getIdFromUrl = function (url) {
  const urlParts = url.split('/')
  return parseInt(urlParts.pop() || urlParts.pop(), 10)
}

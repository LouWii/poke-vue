export const getSpriteUrl = function(spritePath) {
  return 'https://raw.githubusercontent.com/PokeAPI/sprites/master' + spritePath.replace('/media', '')
}

export const defaultSpriteName = 'front_default'
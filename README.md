# poke-vue

> A Pokedex built with Vue with language support, based on [PokeAPI](https://pokeapi.co/).

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080 (for dev)
npm run dev

# build electron application for production
npm run build
npm run build:dir   # - this builds an app without installer
npm run build:clear # - deletes all builds from the build folder
npm run build:web   # - builds for web platform

# run unit & end-to-end tests
npm test

# lint all JS/Vue component files in `src/`
npm run lint

```

Linux requires `libgconf-2-4`, run `apt-get install libgconf-2-4` (Ubuntu etc..) or `sudo pacman -S gconf` (Arch Linux...)

## Licence

MIT Copyright 2019 Louwii

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8fae476](https://github.com/SimulatedGREG/electron-vue/tree/8fae4763e9d225d3691b627e83b9e09b56f6c935) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

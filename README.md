# poke-vue

> A Pokedex built with Vue with translation support, based on [PokeAPI](https://pokeapi.co/) data.

## About translations

All the content of the app is based on poke api data. Official translations are sometimes missing, the app will fallback to english in such cases.

## Want a feature? Missing data? Found a bug?

[Submit a ticket](/issues/new). Make sure to write down all the information you can. Screenshots can also help.

## Project setup

This project was built with [vue-cli](https://cli.vuejs.org/), [Vue CLI Plugin Electron Builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/), [node-sqlite3](https://github.com/mapbox/node-sqlite3)

```
npm install
```

poke-vue fetches data from a local sqlite3 database. Electron needs to be re-built to include sqlite3, we're doing that via `electron-rebuild` (see [SO question](https://stackoverflow.com/questions/38716594/electron-app-cant-find-sqlite3-module))

Python needs to be installed for this to work. I also wasn't able to run it in cygwin, had to run it in Powershell. Once ran, I was able to launch the app via cygwin though.

```
./node_modules/.bin/electron-rebuild -w sqlite3
```

Note: Consider [sql.js](https://github.com/kripken/sql.js/) that might be able to replace sqlite3 and the need for re-building electron.


### Compiles and hot-reloads for development
```
npm run serve
```

```
npm run electron:serve
```

### Compiles and minifies for production
```
npm run build
```

```
npm run electron:build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Bugs

#### Electron doesn't launch on `electron:serve`

See [Github issue](https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/441)

#### Error about chrome-sandbox in prod build

[See this Github issue](https://github.com/electron/electron/issues/17972)
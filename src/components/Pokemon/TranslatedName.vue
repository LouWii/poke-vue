<template>
  <span>{{ pokemonName }}</span>
</template>

<script>
export default {
  name: 'TranslatedName',
  props: {
    pokemon: {
      type: Object,
      required: true
    }
  },
  computed: {
    pokemonName() {
      return this.pokemon.t_name?this.pokemon.t_name:this.pokemon.name
    }
  },
}
</script>
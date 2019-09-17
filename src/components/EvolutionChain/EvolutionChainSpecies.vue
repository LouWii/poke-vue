<template>
  <div class="evolution-chain-species">
    <router-link :to="{name: 'pokemon', params: {id: species.id}}">
      {{species.t_name||species.name}}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'EvolutionChainSpecies',
  props: {
    species: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.evolution-chain-species {

}
</style>
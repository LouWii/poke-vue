<template>
  <div class="generations-dropdown-wrapper">
    <select v-model="selectedGenerationId">
      <option value="">All</option>
      <option v-for="generation in allGenerations" :key="generation.id" :value="generation.id">
        {{generation.t_name}}
      </option>
    </select>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'

export default {
  name: 'GenerationsDropdown',
  data: () => {
    return {
      selectedGenerationId: ''
    }
  },
  beforeMount: function() {
    if (!this.allGenerations || this.allGenerations.length == 0) {
      this.getGenerations()
    }
    this.selectedGenerationId = this.storeSelectedGenerationId
  },
  computed: {
    ...mapGetters(['allGenerations']),
    ...mapState({
      storeSelectedGenerationId: state => state.pokemonList.generationId
    })
  },
  methods: {
    ...mapActions(['getGenerations', 'setPokemonListGenerationId'])
  },
  watch: {
    selectedGenerationId: {
      handler: function(generationId) {
        this.setPokemonListGenerationId(generationId)
      }
    }
  }
}
</script>
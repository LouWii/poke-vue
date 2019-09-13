<template>
  <div class="generations-dropdown-wrapper">
    <select v-model="selectedGenerationId">
      <option value="">All</option>
      <option v-for="generation in allGenerations" :key="generation.id" :value="generation.id">
        {{generation.t_name}} ({{getGenerationVersionsString(generation.id)}})
      </option>
    </select>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import { setTimeout } from 'timers';

export default {
  name: 'GenerationsDropdown',
  data: () => {
    return {
      selectedGenerationId: ''
    }
  },
  beforeMount: function() {
    if (!this.allGenerations || this.allGenerations.length === 0) {
      this.getGenerations()
    }
    if (!this.allGenerationsVersionIds || this.allGenerationsVersionIds.length === 0) {
      this.getGenerationsVersions()
    }
    this.selectedGenerationId = this.storeSelectedGenerationId
  },
  computed: {
    ...mapGetters(['allGenerations', 'allGenerationsVersionIds', 'generationVersionsName']),
    ...mapState({
      storeSelectedGenerationId: state => state.pokemonList.generationId
    }),
  },
  methods: {
    ...mapActions(['getGenerations', 'getGenerationsVersions', 'setPokemonListGenerationId']),
    getGenerationVersionsString(generationId) {
      return this.generationVersionsName(generationId).join(', ')
    }
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
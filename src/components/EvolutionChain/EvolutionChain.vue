<template>
  <div class="evolution-chain">
    <h4>Evolutions</h4>
    <div class="evolutions-container">
      <div v-if="babySpecies.length" class="species-column babies-sp">
        <evolution-chain-species v-for="sp in babySpecies" :key="sp.id" :species="sp" />
      </div>
      <div v-if="baseSpecies.length" class="species-column base-sp">
        <evolution-chain-species v-for="sp in baseSpecies" :key="sp.id" :species="sp" />
      </div>
      <div v-if="evolution1Species.length" class="species-column base-sp">
        <evolution-chain-species v-for="sp in evolution1Species" :key="sp.id" :species="sp" />
      </div>
      <div v-if="evolution2Species.length" class="species-column base-sp">
        <evolution-chain-species v-for="sp in evolution2Species" :key="sp.id" :species="sp" />
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import EvolutionChainSpecies from '@/components/EvolutionChain/EvolutionChainSpecies'

export default {
  name: 'EvolutionChain',
  components: {EvolutionChainSpecies},
  props: {
    evolutionChainId: {
      required: true
    }
  },
  data: () => {
    return {
      babySpecies: [],
      baseSpecies: [],
      evolution1Species: [],
      evolution2Species: [],
    }
  },
  beforeMount: function() {
    this.initSpecies()
  },
  methods: {
    ...mapActions(['getEvolutionChainSpecies']),
    initSpecies: function() {
      // Apparently, evolutions are always structured like this (with some part optional):
      //  baby (opt) -- base -- evolution 1 (opt) -- evolution 2 (opt)
      // But, there might be more than one evolution!

      this.getEvolutionChainSpecies(this.evolutionChainId)
        .then(species => {
          const localBabyIds = []
          const localBaseIds = []
          const localEv1Ids = []
          const localEv2Ids = []

          // Hopefully our species are ordered the right way (from baby to ev2)
          species.forEach(sp => {
            if (sp.is_baby) {
              this.babySpecies.push(sp)
              localBabyIds.push(sp.id)
            } else {
              if (localBabyIds.includes(sp.evolves_from_species_id)
                || (localBabyIds.length === 0 && !sp.evolves_from_species_id)) {
                this.baseSpecies.push(sp)
                localBaseIds.push(sp.id)
              } else if (localBaseIds.includes(sp.evolves_from_species_id)) {
                this.evolution1Species.push(sp)
                localEv1Ids.push(sp.id)
              } else if (localEv1Ids.includes(sp.evolves_from_species_id)) {
                this.evolution2Species.push(sp)
                localEv2Ids.push(sp.id)
              } else {
                console.error(`Species ${sp.id} is not evolution? (chain ${this.evolutionChainId})`)
              }
            }
          });
        })
    }
  }
}
</script>

<style lang="scss">
.evolution-chain {
  padding: 0 $padding-global;

  .evolutions-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .species-column {
      flex: 1;
      min-width: 80px;
      text-align: center;
    }
  }
}
</style>
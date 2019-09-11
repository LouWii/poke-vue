<template>
  <section class="pokemon-varieties">
    <div v-if="varieties.length > 1" class="varieties-selector-wrapper">
      <div class="selector">
        <ul>
          <li v-for="(pVariety, index) in varieties" :key="pVariety.id">
            <button :data-variety-index="index" @click="selectVariety">{{ pVariety.name }}</button>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="varieties.length" class="varieties-wrapper">
      <variety :variety="selectedVariety" :pokemonHasMultiple="varieties.length>1" />
    </div>
  </section>
</template>

<script>
import {mapActions} from 'vuex'
import Variety from '@/components/Pokemon/Variety'

export default {
  name: 'Varieties',
  components: {Variety},
  props: {
    speciesId: {
      required: true,
      validator: value => {
        return !isNaN(value)
      }
    }
  },
  data: () => {
    return {
      varieties: [],
      selectedVarietyIndex: 0,
    }
  },
  beforeMount: function() {
    this.getPokemons({filters: {pokemon_species_id: this.speciesId}})
      .then(rows => {
        console.log(rows)
        this.varieties = rows
      })
      .catch(error => {
        console.error(error)
      })
  },
  computed: {
    selectedVariety: function() {
      return this.varieties[this.selectedVarietyIndex]
    }
  },
  methods: {
    ...mapActions(['getPokemons']),
    selectVariety (event) {
      this.selectedVarietyIndex = event.currentTarget.getAttribute('data-variety-index')
    }
  }
}
</script>

<style lang="scss">
.pokemon-varieties {
  .varieties-selector-wrapper {
    .selector {
      ul {
        display: flex;
        list-style: none;
        padding: 0;
      }
      li {
        padding: 5px 15px;
      }
    }
  }
}
</style>
<template>
  <section class="pokemon-variety">
    <header>
      <h4>{{pokemonVarietyId}} - {{varietyTempName}}</h4>
    </header>
    <div v-if="currentVariety">
      <div class=""><label>Height</label><span>{{currentVariety.height}}</span></div>
      <div class=""><label>Weight</label><span>{{currentVariety.height}}</span></div>
    </div>
  </section>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex'

  export default {
    name: 'poke-variety',
    props: {
      pokemonVarietyId: {
        type: Number,
        required: true
      },
      isDefaultVariety: {
        type: Boolean,
        default: false
      },
      pokemonHasMultiple: {
        type: Boolean,
        default: false
      },
      varietyTempName: {
        type: String,
        default: null
      }
    },
    computed: {
      ...mapGetters(['getVariety']),
      ...mapState({
        varieties: (state) => state.Varieties.varieties
      }),
      ...{
        currentVariety: function () { return this.varieties[this.pokemonVarietyId] }
      }
    },
    mounted: function () {
      if (typeof this.currentVariety === 'undefined') {
        this.loadVariety(this.pokemonVarietyId)
      }
    },
    methods: {
      ...mapActions(['loadVariety'])
    }
  }
</script>
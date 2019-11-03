<template>
  <div v-if="stats.length" class="variety-stats">
    <h3>Stats</h3>
    <div class="">
      <div class="stats-row" v-for="stat in stats" :key="stat.id">
        <label>{{ statName(stat.id) }}</label><span>{{ stat.base_stat }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'VarietyStats',
  props: {
    varietyId: {
      required: true,
      type: Number
    }
  },
  data: () => {
    return {
      stats: [],
    }
  },
  beforeMount() {
    this.initView()
  },
  computed: {
    ...mapGetters(['statName'])
  },
  methods: {
    ...mapActions(['getPokemonStats']),
    initView() {
      this.getPokemonStats(this.varietyId)
        .then(stats => { this.stats = stats })
    }
  },
  watch: {
    varietyId: {
      handler: function() {
        this.initView()
      }
    }
  }
}
</script>
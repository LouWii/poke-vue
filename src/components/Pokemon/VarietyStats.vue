<template>
  <div v-if="stats.length" class="variety-stats">
    <h3>Stats</h3>
    <div class="stats-rows">
      <div class="stats-row" v-for="stat in stats" :key="stat.id">
        <label>{{ statName(stat.stat_id) }}</label><span>{{ stat.base_stat }}</span>
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
        .catch(error => console.error(error))
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

<style lang="scss">
  .variety-stats {
    h3 {
      margin-bottom: $margin-global-small;
    }
    .stats-rows {
      .stats-row {
        @extend .attribute-row;
        margin: $margin-global-small 0;

        label {
          width: 160px;
        }
      }
    }
  }
</style>
<template>
  <div class="pokemon-summary">
    <div v-if="summaries.length != 0" class="summary-content">
      <div class="summary">{{ currentSummary }}</div>
      <div class="versions">
        <inline-list :versionIds="currentSummaryVersions" />
      </div>
    </div>
    <div v-if="summaries.length != 0" class="controls">
      <button class="clear" type="button" @click="onControlLeft">
        <font-awesome-icon icon="angle-left"/>
      </button>
      <button class="clear" type="button" @click="onControlRight">
        <font-awesome-icon icon="angle-right"/>
      </button>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import InlineList from '@/components/Version/InlineList'

export default {
  name: 'TranslatedSummary',
  components: {InlineList},
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
      currentSummaryIndex: 0,
      summaries: []
    }
  },
  beforeMount: function() {
    this.initFlavorTexts()
  },
  computed: {
    currentSummary: function () {
      if (this.summaries.length) {
        if (this.summaries[this.currentSummaryIndex].t_flavor_text) {
          return this.summaries[this.currentSummaryIndex].t_flavor_text
        }
        return this.summaries[this.currentSummaryIndex].flavor_text
      }
      return null;
    },
    currentSummaryVersions: function() {
      return this.summaries.length ? this.summaries[this.currentSummaryIndex].versions : []
    }
  },
  methods: {
    ...mapActions(['getPokemonSpeciesFlavorTexts']),
    initFlavorTexts() {
      this.getPokemonSpeciesFlavorTexts(this.speciesId)
      .then(rows => {

        // Group by english flavor text (sometime the same between versions)
        let flavorTexts = [];
        rows.forEach(flavorTextRow => {
          const idx = flavorTexts
            .findIndex(flavorText => flavorText.flavor_text === flavorTextRow.flavor_text)
          if (-1 !== idx) {
            flavorTexts[idx].versions.push(flavorTextRow.version_id)
          } else {
            flavorTexts.push({
              flavor_text: flavorTextRow.flavor_text,
              t_flavor_text: flavorTextRow.t_flavor_text,
              versions: [flavorTextRow.version_id]
            })
          }
        });
        this.summaries = flavorTexts
      })
      .catch(error => {
        console.error(error)
      })
    },
    onControlLeft () {
      this.currentSummaryIndex--
      if (this.currentSummaryIndex < 0) this.currentSummaryIndex = this.summaries.length - 1
    },
    onControlRight () {
      this.currentSummaryIndex = (this.currentSummaryIndex + 1) % (this.summaries.length)
    }
  },
  watch: {
    speciesId: {
      handler: function() {
        this.initFlavorTexts()
      }
    }
  }
}
</script>

<style lang="scss">
.pokemon-summary {
  margin-bottom: 15px;
  padding: 0 $padding-global;

  .summary-content {
    // min-height: 80px;
  }
  .versions {
    margin-top: 5px;
    text-align: right;
    span {
      display: inline-block;
      font-style: italic;
      font-size: 90%;
      margin: 0 5px;
      & ~ span {
        margin-left: 0;
        &::before {
          content: '|';
          display: inline-block;
          margin-right: 5px;
        }
      }
    }
  }
  .controls {
    button {
      font-size: 24px;
    }
  }
}
</style>
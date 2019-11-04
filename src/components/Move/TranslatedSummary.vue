<template>
  <div class="move-translated-summary">
    <div v-if="summaries.length != 0" class="summary-content">
      <div class="summary">{{ currentSummary }}</div>
      <div class="versions">
        <span v-for="version in currentSummaryVersions" :key="version.id">{{version.t_name||version.name}}</span>
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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TranslatedSummary',
  props: {
    moveId: {
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
  beforeMount() {
    this.initComponent()
  },
  computed: {
    ...mapGetters(['versionsFromVersionGroup']),
    currentSummary: function () {
      if (this.summaries.length) {
        if (this.summaries[this.currentSummaryIndex].t_flavor_text) {
          return this.summaries[this.currentSummaryIndex].t_flavor_text.replace("\\n", ' ')
        }
        return this.summaries[this.currentSummaryIndex].flavor_text
      }
      return null;
    },
    currentSummaryVersions: function() {
      const versions = []
      this.summaries[this.currentSummaryIndex].versionGroups.forEach(vgId => {
        this.versionsFromVersionGroup(vgId).forEach(v => versions.push(v))
      })
      return versions
    }
  },
  methods: {
    ...mapActions(['getMoveFlavorText']),
    initComponent: function() {
      this
        .getMoveFlavorText(this.moveId)
        .then(fTexts => {
          let flavorTexts = []

          // Group flavor texts by text (as sometime the text is the same for multiple version groups)
          fTexts.forEach(fText => {
            const searchIdx = flavorTexts.findIndex(ft => ft.flavor_text === fText.flavor_text)
            if (-1 !== searchIdx) {
              flavorTexts[searchIdx].versionGroups.push(fText.version_group_id)
            } else {
              flavorTexts.push({
                flavor_text: fText.flavor_text,
                t_flavor_text: fText.t_flavor_text,
                versionGroups: [fText.version_group_id]
              })
            }
          })

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
    },
  },
  watch: {
    moveId: {
      handler: function() {
        this.initComponent()
      }
    }
  }
}
</script>

<style lang="scss">
.move-translated-summary {
  padding: 0 $padding-global-medium;

  .controls {
    button {
      font-size: 24px;
    }
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
}
</style>
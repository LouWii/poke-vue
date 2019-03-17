<template>
  <div v-if="summaries.length != 0" class="pokemon-summary">
    <div class="summary-content">
      <div class="summary">{{ currentSummary }}</div>
      <div class="versions">
        <span v-for="version in currentVersions" :key="version.name">{{ getVersionName(version) }}</span>
      </div>
    </div>
    <div class="controls">
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
  import { mapGetters } from 'vuex'

  export default {
    name: 'poke-summary',
    props: {
      summaries: {
        type: Array,
        required: true
      }
    },
    data: () => {
      return {
        currentSummaryIndex: 0
      }
    },
    mounted: function () { },
    computed: {
      ...mapGetters(['getVersionNameForLanguage']),
      ...{
        currentSummary: function () {
          return this.summaries.length ? this.summaries[this.currentSummaryIndex].flavor_text : null
        },
        currentVersions: function () {
          return this.summaries.length ? this.summaries[this.currentSummaryIndex].versions : []
        }
      }
    },
    methods: {
      ...{
        getVersionName (version) {
          return this.getVersionNameForLanguage(version)
        },
        onControlLeft (event) {
          this.currentSummaryIndex--
          if (this.currentSummaryIndex < 0) this.currentSummaryIndex = this.summaries.length - 1
        },
        onControlRight (event) {
          this.currentSummaryIndex = (this.currentSummaryIndex + 1) % (this.summaries.length)
        }
      }
    }
  }
</script>

<style lang="scss">
  .pokemon-summary {
    margin: 25px 0 15px;

    .summary-content {
      min-height: 80px;
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

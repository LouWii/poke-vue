<template>
  <span v-if="versionIds.length > 0" class="version-inline-list">
    <span v-for="version in versions" :key="version.id">{{ version.t_name }}</span>
  </span>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'InlineList',
  props: {
    versionIds: {
      type: Array,
      required: true,
    }
  },
  data: () => {
    return {
      versions: []
    }
  },
  beforeMount: function() {
    this.processIds()
  },
  methods: {
    ...mapActions(['getVersions']),
    processIds: function() {
      this.getVersions({ids: this.versionIds})
      .then(rows => {
        this.versions = rows
      })
    }
  },
  watch: {
    versionIds: {
      handler: function(newIds) {
        this.processIds()
      }
    }
  }
}
</script>
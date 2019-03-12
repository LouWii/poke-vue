<template>
  <div class="pokemon-moves">
    <div class="version-group-selector">
      <select v-model="selectedVersionGroup">
        <option
          v-for="(move, moveIndex) in Object.keys(moves)"
          :key="moveIndex"
          :value="move">
          {{ getVersionGroupNamesForLanguageFromVersionGroupId(moves[move].versionGroupId).join(', ') }}
        </option>
      </select>
    </div>
    <div class="version-group-moves" v-if="selectedVersionGroup">
      {{ moves[selectedVersionGroup].learnMethods.machine }}
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'poke-moves',
    props: {
      moves: {
        type: Object,
        required: true
      }
    },
    data: () => {
      return {
        selectedVersionGroup: null
      }
    },
    computed: {
      ...mapGetters(['getVersionGroupNamesForLanguageFromVersionGroupId'])
    },
    mounted: function () {
      this.selectedVersionGroup = Object.keys(this.moves)[0]
    },
    methods: { }
  }
</script>

<template>
  <div class="pokemon-moves">
    <div class="version-group-selector">
      <select v-model="selectedVersionGroup">
        <!-- <option
          v-for="(move, moveIndex) in Object.keys(moves)"
          :key="moveIndex"
          :value="move">
          {{ getVersionGroupNamesForLanguageFromVersionGroupId(moves[move].versionGroupId).join(', ') }}
        </option> -->
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Moves',
  data: () => {
    return {
      selectedVersionGroup: null
    }
  },
}
</script>

<style lang="scss">
.version-group-moves {
  margin-top: 15px;
}
</style>
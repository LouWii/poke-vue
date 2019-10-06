<template>
  <div class="variety-moves">
    <h3>Moves</h3>
    <div class="version-group-selector">
      <label for="version-group-moves-selector">Versions:</label>
      <select id="version-group-moves-selector" v-model="selectedVersionGroup">
        <!-- <option
          v-for="(move, moveIndex) in Object.keys(moves)"
          :key="moveIndex"
          :value="move">
          {{ getVersionGroupNamesForLanguageFromVersionGroupId(moves[move].versionGroupId).join(', ') }}
        </option> -->
        <option v-for="versionGroup in versionGroups" :key="versionGroup.versionGroupId" :value="versionGroup.versionGroupId">
          {{versionGroup.versionsStr}}
        </option>
      </select>
    </div>
    <moves-by-method v-if="selectedVersionGroup" :pokemonMoves="selectedMoves" />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import MovesByMethod from '@/components/Move/MovesByMethod'

export default {
  name: 'VarietyMoves',
  components: {MovesByMethod},
  data: () => {
    return {
      selectedVersionGroup: null,
      versionGroups: [],
    }
  },
  props: {
    varietyId: {
      required: true,

    }
  },
  beforeMount: function() {
    if (!this.allVersions || this.allVersions.length === 0) {
      this.getVersions().then(function(){
        this.initVersionsDropdown()
      }.bind(this))
    } else {
      this.initVersionsDropdown()
    }
  },
  computed: {
    ...mapGetters(['allVersions', 'pokemonMoves', 'versionsFromVersionGroup']),
    selectedMoves: function() {
      return this
        .pokemonMoves(this.varietyId)
        .filter(pkMove => pkMove.version_group_id === this.selectedVersionGroup)
    }
  },
  methods: {
    ...mapActions(['getPokemonMoves', 'getVersions']),
    initVersionsDropdown() {
      this.getPokemonMoves(this.varietyId)
        .then(function() {
          const versionGroupIds = this.getPokemonMovesVersionGroups()
          let versionGroups = []
          let minVersionGroupId = null
          versionGroupIds.forEach(vgId => {
            if (!minVersionGroupId) minVersionGroupId = vgId
            versionGroups.push({
              versionGroupId: vgId,
              versionsStr: this.versionsFromVersionGroup(vgId).map(v => v.t_name||v.name).join(', ')
            })
          })
          this.versionGroups = versionGroups
          this.selectedVersionGroup = minVersionGroupId
        }.bind(this))
    },
    getPokemonMovesVersionGroups() {
      const versionGroupIds = []
      this.pokemonMoves(this.varietyId).forEach(pkMove => {
        if (-1 === versionGroupIds.indexOf(pkMove.version_group_id)) {
          versionGroupIds.push(pkMove.version_group_id)
        }
      })
      return versionGroupIds
    }
  },
  watch: {
    varietyId: {
      handler: function() {
        this.initVersionsDropdown()
      }
    }
  }
}
</script>

<style lang="scss">
.variety-moves {
  margin-top: $margin-global;
  h3 {
    margin: 0;
  }
}
.version-group-selector {
  margin: $margin-global-medium 0;
  label {
    display: inline-block;
    font-size: $font-size-medium;
    margin-right: $margin-global-medium;
  }
}
</style>
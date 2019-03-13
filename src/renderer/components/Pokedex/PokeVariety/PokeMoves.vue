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
      <!-- {{ moves[selectedVersionGroup].learnMethods.machine }} -->
      <level-up-moves
        v-if="moves[selectedVersionGroup].learnMethods['level-up']"
        :moves="moves[selectedVersionGroup].learnMethods['level-up'].moves"></level-up-moves>
      <machine-moves
        v-if="moves[selectedVersionGroup].learnMethods['machine']"
        :moves="moves[selectedVersionGroup].learnMethods['machine'].moves"></machine-moves>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import LevelUpMoves from './Moves/LevelUpMoves'
  import MachineMoves from './Moves/MachineMoves'

  export default {
    name: 'poke-moves',
    components: { LevelUpMoves, MachineMoves },
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
      // console.log(Object.keys(this.moves[this.selectedVersionGroup].learnMethods))
    },
    methods: { }
  }
</script>

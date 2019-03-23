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
    <vue-tabs class="version-group-moves" v-if="selectedVersionGroup">
      <!-- {{ moves[selectedVersionGroup].learnMethods.machine }} -->
      <v-tab title="Level Up" v-if="moves[selectedVersionGroup].learnMethods['level-up']">
        <level-up-moves
          :moves="moves[selectedVersionGroup].learnMethods['level-up'].moves"
          :showTitle="false"></level-up-moves>
      </v-tab>
      <v-tab title="Machine" v-if="moves[selectedVersionGroup].learnMethods['machine']">
        <machine-moves
          :moves="moves[selectedVersionGroup].learnMethods['machine'].moves"
          :showTitle="false"></machine-moves>
      </v-tab>
      <v-tab title="Egg" v-if="moves[selectedVersionGroup].learnMethods['egg']">
        <machine-moves
          :moves="moves[selectedVersionGroup].learnMethods['egg'].moves"
          :showTitle="false"></machine-moves>
      </v-tab>
      <v-tab title="Tutor" v-if="moves[selectedVersionGroup].learnMethods['tutor']">
        <machine-moves
          :moves="moves[selectedVersionGroup].learnMethods['tutor'].moves"
          :showTitle="false"></machine-moves>
      </v-tab>
      <v-tab title="Stadium surfing pikachu" v-if="moves[selectedVersionGroup].learnMethods['stadium-surfing-pikachu']">
        <machine-moves
          :moves="moves[selectedVersionGroup].learnMethods['stadium-surfing-pikachu'].moves"
          :showTitle="false"></machine-moves>
      </v-tab>
      <v-tab title="Light ball egg" v-if="moves[selectedVersionGroup].learnMethods['light-ball-egg']">
        <machine-moves
          :moves="moves[selectedVersionGroup].learnMethods['light-ball-egg'].moves"
          :showTitle="false"></machine-moves>
      </v-tab>
      <v-tab title="Colosseum purification" v-if="moves[selectedVersionGroup].learnMethods['colosseum-purification']">
        <machine-moves
          :moves="moves[selectedVersionGroup].learnMethods['colosseum-purification'].moves"
          :showTitle="false"></machine-moves>
      </v-tab>
      <v-tab title="XD shadow" v-if="moves[selectedVersionGroup].learnMethods['xd-shadow']">
        <machine-moves
          :moves="moves[selectedVersionGroup].learnMethods['xd-shadow'].moves"
          :showTitle="false"></machine-moves>
      </v-tab>
      <v-tab title="XD purification" v-if="moves[selectedVersionGroup].learnMethods['xd-purification']">
        <machine-moves
          :moves="moves[selectedVersionGroup].learnMethods['xd-purification'].moves"
          :showTitle="false"></machine-moves>
      </v-tab>
      <v-tab title="Form change" v-if="moves[selectedVersionGroup].learnMethods['form-change']">
        <machine-moves
          :moves="moves[selectedVersionGroup].learnMethods['form-change'].moves"
          :showTitle="false"></machine-moves>
      </v-tab>
    </vue-tabs>
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
    methods: { },
    watch: {
      moves: {
        handler: function () {
          this.selectedVersionGroup = Object.keys(this.moves)[0]
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss">
  .version-group-moves {
    margin-top: 15px;
  }
</style>
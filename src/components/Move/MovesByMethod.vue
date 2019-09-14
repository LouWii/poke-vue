<template>
  <div class="moves-by-method">
    <div class="moves-method-filters" v-if="moveLearnMethods.length">
      <button
        v-for="mlMethod in moveLearnMethods"
        :key="mlMethod.id"
        @click="selectedMoveLearnMethodId = mlMethod.id"
        type="button">
        {{mlMethod.t_name||mlMethod.name}}
      </button>
    </div>
    <move-rows :pokemonMoves="selectedMoves"/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import MoveRows from '@/components/Move/MoveRows'

export default {
  name: 'MovesByMethod',
  components: {MoveRows},
  props: {
    pokemonMoves: {
      required: true,
      type: Array
    }
  },
  data: () => {
    return {
      moveLearnMethods: [],
      selectedMoveLearnMethodId: null,
    }
  },
  beforeMount: function() {
    if (!this.allMoveLearnMethods || this.allMoveLearnMethods.length === 0) {
      this.getMoveLearnMethods().then(function(){
        this.initTypesDropdown()
      }.bind(this))
    } else {
      this.initTypesDropdown()
    }
  },
  computed: {
    ...mapGetters(['allMoveLearnMethods', 'moveLearnMethod']),
    selectedMoves: function() {
      return this.selectedMoveLearnMethodId?this.pokemonMoves.filter(pMove => pMove.move_learn_method_id === this.selectedMoveLearnMethodId):[]
    }
  },
  methods: {
    ...mapActions(['getMoveLearnMethods']),
    initTypesDropdown() {
      const moveLearnMethods = []
      this.getUniqueMoveLearnMethods().forEach(mlmId => {
        moveLearnMethods.push(this.moveLearnMethod(mlmId))
      })

      this.moveLearnMethods = moveLearnMethods
    },
    getUniqueMoveLearnMethods() {
      const learnMethodIds = []
      this.pokemonMoves.forEach(pkMove => {
        if (!learnMethodIds.includes(pkMove.move_learn_method_id)) learnMethodIds.push(pkMove.move_learn_method_id)
      })

      return learnMethodIds.sort()
    }
  },
  watch: {
    pokemonMoves: {
      handler: function() {
        this.initTypesDropdown()
      }
    }
  }
}
</script>
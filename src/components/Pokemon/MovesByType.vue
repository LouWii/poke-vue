<template>
  <div class="moves-by-type">
    <div class="" v-if="moveLearnMethods.length">
      <button v-for="mlMethod in moveLearnMethods" :key="mlMethod.id">
        {{mlMethod.t_name||mlMethod.name}}
      </button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'MovesByType',
  props: {
    pokemonMoves: {
      required: true,
      type: Array
    }
  },
  data: () => {
    return {
      moveLearnMethods: []
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
    ...mapGetters(['allMoveLearnMethods', 'moveLearnMethod'])
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
<template>
  <div class="move-rows">
    <move-row
      v-for="move in moves"
      :key="move.move.id"
      :move="move.move"
      :pokemonMove="move.pokemonMove" />
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import MoveRow from '@/components/Move/MoveRow'

export default {
  name: 'MoveRows',
  components: {MoveRow},
  props: {
    pokemonMoves: {
      required: true,
      type: Array
    }
  },
  data: () => {
    return {
      moves: []
    }
  },
  beforeMount: function() {
    this.initMoves()
  },
  methods: {
    ...mapActions(['getMovesFromIds']),
    initMoves: function() {
      const moveIds = []
      this.pokemonMoves.forEach(pM => {moveIds.push(pM.move_id)})
      this.getMovesFromIds(moveIds)
        .then(moves => {
          let movesMerged = []
          this.pokemonMoves.forEach(pM => {
            movesMerged.push({
              move: moves.find(m => m.id === pM.move_id),
              pokemonMove: pM
            })
          })
          this.moves = movesMerged.sort((a, b) => a.pokemonMove.level - b.pokemonMove.level)
        })
        .catch(error => {
          console.error(error)
        })
    },
    fetchMoves: function() {
      this.getMovesFromIds()
        .then()
    }
  },
  watch: {
    pokemonMoves: {
      handler: function() {
        this.initMoves()
      }
    }
  }
}
</script>
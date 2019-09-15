<template>
  <div class="move-rows" v-if="moves.length">
    <div class="headers">
      <div class="header">Move</div>
      <div v-if="showLevel" class="header">Level</div>
      <div class="header">PP</div>
      <div class="header" title="Power">Pow.</div>
      <div class="header" title="Accuracy">Accur.</div>
      <div class="header">Type</div>
    </div>
    <move-row
      v-for="move in moves"
      :key="move.pokemonMove.id"
      :move="move.move"
      :pokemonMove="move.pokemonMove" 
      :showLevel="showLevel"/>
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
    },
    showLevel: {
      type: Boolean,
      default: false,
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

<style lang="scss">
.move-rows {
  margin: $margin-global 0;
  .headers {
    display: table-row;

    .header {
      display: table-cell;
      font-weight: 600;
      padding: $padding-global-small;

      &:first-child {
        padding-left: 0;
      }
    }
  }
}
</style>
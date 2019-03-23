<template>
  <div class="level-up-moves">
    <h4 v-if="showTitle">Level-Up</h4>
    <div class="level-up-move header">
      <div class="level">Level</div>
      <div class="move">Move</div>
    </div>
    <div
      class="level-up-move"
      v-for="move in orderedMoves"
      :key="move.move.name">
      <div class="level">{{move.level_learned_at}}</div>
      <div class="move">{{move.move.move.name}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'level-up-moves',
    props: {
      moves: {
        required: true,
        validator: value => { return typeof value === 'undefined' || value === null || Array.isArray(value) }
      },
      showTitle: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      ...{
        orderedMoves: function () {
          return this.moves.sort((moveValue1, moveValue2) => moveValue1.level_learned_at - moveValue2.level_learned_at)
        }
      }
    },
    mounted: function () {
      // console.log(this.moves)
    }
  }
</script>

<style lang="scss">
.level-up-moves {
  .level-up-move {
    padding: 5px 0;

    &.header {
      font-weight: bold;
    }
    .level, .move {
      display: inline-block;
    }
    .level {
      text-align: center;
      width: 50px;
    }
  }
}
</style>
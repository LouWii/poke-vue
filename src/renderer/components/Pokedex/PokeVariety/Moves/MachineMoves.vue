<template>
  <div class="machine-moves">
    <h4 v-if="showTitle">Machine</h4>
    <!-- TODO: add filtering -->
    <div class="machine-moves-wrapper">
      <div
        class="machine-move"
        v-for="move in orderedMoves"
        :key="move.move.move.name">
        {{move.move.move.name}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'machine-moves',
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
          // TODO: order alphabetically with translated names
          return this.moves
        }
      }
    },
    mounted: function () {
      // console.log(this.moves)
    }
  }
</script>

<style lang="scss">
.machine-moves {
  .machine-moves-wrapper {
    &::after {
      display: table;
      content: "";
      clear: both;
    }
  }
  .machine-move {
    float: left;
    padding: 5px 0;
    text-align: center;
    width: 50%;
  }
}
</style>
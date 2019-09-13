<template>
  <div class="moves-by-type">

  </div>
</template>

<script>
export default {
  name: 'MovesByType',
  props: {
    pokemonMoves: {
      required: true,
      type: Array
    }
  },
  beforeMount: function() {
    console.log(this.pokemonMoves)
  }
}
</script>
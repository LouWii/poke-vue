<template>
  <div class="move-row">
    <div class="move-attributes" v-if="move">
      <div class="attr name">{{move.t_name||move.name}}</div>
      <div v-if="pokemonMove" class="attr level">{{pokemonMove.level}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoveRow',
  props: {
    move: {
      type: Object,
      required: true
    },
    pokemonMove: {
      type: Object
    }
  }
}
</script>
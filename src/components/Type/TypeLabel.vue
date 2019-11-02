<template>
  <span :class="[type.name, 'type-label']">
    {{ type.t_name }}
  </span>
</template>

<script>
  export default {
    name: 'TypeLabel',
    props: {
      type: {
        required: true,
        type: Object,
      }
    }
  }
</script>

<style lang="scss">
  .type-label {
    border-radius: $border-radius;
    color: #fff;
    display: inline-block;
    font-family: monospace;
    font-size: 12px;
    font-weight: bold;
    margin-right: 7px;
    padding: 3px 4px;

    &.bug {
      background-color: #a8b820;
    }
    &.dark {
      background-color: #705848;
    }
    &.dragon {
      background-color: #7038f8;
    }
    &.electric {
      background-color: #f8d030;
    }
    &.fairy {
      background-color: #f8a0e0;
    }
    &.fighting {
      background-color: #903028;
    }
    &.fire {
      background-color: #f05030;
    }
    &.flying {
      background-color: #a890f0;
    }
    &.ghost {
      background-color: #705898;
    }
    &.grass {
      background-color: #78c850;
    }
    &.ground {
      background-color: #e0c068;
    }
    &.ice {
      background-color: #98d8d8;
    }
    &.normal {
      background-color: #a8a878;
    }
    &.poison {
      background-color: #a040a0;
    }
    &.psychic {
      background-color: #f85888;
    }
    &.rock {
      background-color: #b8a038;
    }
    &.shadow {
      background-color: #000;
    }
    &.steel {
      background-color: #b8b8d0;
    }
    &.unknown {
      background-color: #fff;
      color: #000;
    }
    &.water {
      background-color: #6890f0;
    }
  }
</style>
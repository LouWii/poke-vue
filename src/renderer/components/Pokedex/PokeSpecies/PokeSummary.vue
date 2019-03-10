<template>
  <div class="pokemon-summary">
  </div>
</template>


<script>
  export default {
    name: 'poke-summary',
    props: {
      summaries: {
        type: Array,
        required: true
      }
    },
  }
</script>

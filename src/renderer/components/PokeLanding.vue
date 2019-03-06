<template>
  <main class="pokevue-container">
    <h1>Poke-Vue</h1>
    <loading-step></loading-step>
  </main>
</template>

<script>
  import LoadingStep from './LoadingStep'

  export default {
    name: 'poke-landing',
    components: { LoadingStep },
    methods: { }
  }
</script>
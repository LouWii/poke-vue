<template>
  <div class="home-wrapper">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <MasterList/>
  </div>
</template>

<script>
// @ is an alias to /src
import MasterList from '@/components/Pokedex/MasterList.vue'

export default {
  name: 'home',
  components: {
    MasterList
  }
}
</script>

<style lang="scss">
.home-wrapper {
  height: 100%;
}
</style>
<template>
  <div class="home">
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

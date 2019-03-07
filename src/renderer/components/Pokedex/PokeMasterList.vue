<template>
  <section>
    <h3>Master List</h3>
    <div>
      <ul>
        <li v-for="(pokemonName, index) in pokemonNamesList" :key="index">
          {{ pokemonName }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'poke-master-list',
    components: { },
    computed: {
      ...mapGetters(['pokemonNamesList'])
    },
    methods: { }
  }
</script>
<template>
  <div class="search-field-wrapper">
    <div class="input-with-reset">
      <input type="text" v-model="keywords" placeholder="Search..." />
      <button class="clear" @click.prevent="clearKeywords" role="button">X</button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'SearchField',
  data: () => {
    return {
      keywords: '',
      timer: null,
    }
  },
  beforeMount: function() {
    this.keywords = this.storeKeywords
  },
  computed: {
    ...mapState({
        storeKeywords: state => state.pokemonList.keywords
      })
  },
  methods: {
    ...mapActions(['setPokemonListKeywords']),
    clearKeywords: function() {
      this.keywords = ''
    }
  },
  watch: {
    keywords: {
      handler: function(keywords) {
        clearTimeout(this.timer)
        if (keywords === '') {
          this.setPokemonListKeywords(keywords)
        } else {
          this.timer = setTimeout(
            function() {
              this.setPokemonListKeywords(keywords)
            }.bind(this),
            300
          )
        }
      }
    }
  }
}
</script>

<style lang="scss">
.search-field-wrapper {
  padding: 0 1rem;
  position: relative;
  width: 100%;

  input {
    width: 100%;
  }
}
</style>
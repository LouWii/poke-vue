<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click.prevent="buttonClick">Click</button>
    <p v-if="ability">{{ability.id}}: {{ability.name}}</p>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'About',
  data: function() {
    return {
      ability: null
    }
  },
  methods: {
    ...mapActions(['getAbility']),
    buttonClick: function() {
      this.getAbility(3)
        .then(rows => {
          console.log(rows)
          if (rows.length) {
            this.ability = rows[0]
          }
        })
        .catch(error => console.error(error))
    }
  }
}
</script>
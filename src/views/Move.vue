<template>
  <div class="pokemon-move">
    <header v-if="move">
      <h3>{{ move.t_name }}</h3>
    </header>
    <div class="" v-if="move">
      <move-attributes :move="move"/>
      <move-target :moveTargetId="move.move_target_id" />
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import MoveAttributes from '@/components/Move/MoveAttributes'
import MoveTarget from '@/components/Move/MoveTarget'

export default {
  name: 'Move',
  components: {MoveAttributes, MoveTarget},
  data: () => {
    return {
      move: null,
    }
  },
  beforeMount() {
    this.initView()
  },
  methods: {
    ...mapActions(['getMove']),
    initView: function() {
      this.getMove(parseInt(this.$route.params.id, 10))
        .then(move => this.move = move)
        .catch(error => console.error(error))
    }
  },
  watch: {
    $route: {
      handler: function() {
        this.initView()
      }
    }
  }
}
</script>
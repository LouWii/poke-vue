<template>
  <div class="move-damage-class">
    <label>Move Damage Class:</label>
    <div class="">
      {{moveDamageClassName}}
      <br/>
      <span v-if="moveDamageclassDescription">
        {{moveDamageclassDescription.t_description||moveDamageclassDescription.description}}
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MoveDamageClass',
  props: {
    moveDamageClassId: {
      required: true,
    },
  },
  data: () => {
    return {
      moveDamageclassDescription: null,
    }
  },
  beforeMount() {
    this.initComponent()
  },
  computed: {
    ...mapGetters(['moveDamageClass']),
    moveDamageClassName: function() {
      const mdc = this.moveDamageClass(this.moveDamageClassId)
      return mdc ? mdc.t_name || mdc.e_name || mdc.name : '-'
    }
  },
  methods: {
    ...mapActions(['getMoveDamageClassDescription', 'getMoveDamageClasses']),
    initComponent: function() {
      this.getMoveDamageClasses()
      this.getMoveDamageClassDescription(this.moveDamageClassId)
        .then(mdcd => this.moveDamageclassDescription = mdcd)
    }
  },
  watch: {
    moveTargetId: {
      handler: function() {
        this.initComponent()
      }
    }
  }
}
</script>
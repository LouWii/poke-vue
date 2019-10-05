<template>
  <div class="move-target">
    <label>Target:</label>
    <div class="target-details attribute-value">
      <div class="target-name">
        {{moveTargetObj?moveTargetObj.t_name||moveTargetObj.e_name||moveTargetObj.name:'-'}}
      </div>
      <span v-if="moveTargetDescription">
        {{moveTargetDescription.t_description||moveTargetDescription.description}}
      </span>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'MoveTarget',
  props: {
    moveTargetId: {
      required: true,
      validator: value => {
        return !isNaN(value)
      }
    },
  },
  data: () => {
    return {
      moveTargetObj: null,
      moveTargetDescription: null,
    }
  },
  beforeMount() {
    this.initComponent()
  },
  computed: {
    ...mapGetters(['moveTarget']),
  },
  methods: {
    ...mapActions(['getMoveTargetDescription', 'getMoveTargets']),
    initComponent() {
      this.getMoveTargets().then(() => {
        this.moveTargetObj = this.moveTarget(this.moveTargetId)
      })
      this.getMoveTargetDescription(this.moveTargetId)
        .then(moveTargetDesc => this.moveTargetDescription = moveTargetDesc)
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

<style lang="scss">
.move-target {
  @extend .attribute-row;
  margin: $padding-global-medium;

  .target-details {
    .target-name {
      margin-bottom: $margin-global-small;
    }
    span {
      font-style: italic;
    }
  }
}
</style>
<template>
  <div class="move-target">
    <label>Target:</label>
    <div class="target-details">
      {{moveTargetObj?moveTargetObj.t_name||moveTargetObj.e_name||moveTargetObj.name:'-'}}
      <br/>
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
  padding: 0 $margin-global-medium;

  label {
    display: inline-block;
    font-weight: bold;
    min-width: 100px;
  }

  .target-details {
    display: inline-block;
    max-width: calc(100% - 100px);
    vertical-align: top;

    span {
      font-style: italic;
    }
  }
}
</style>
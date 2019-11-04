<template>
  <div class="move-attributes">
    <div class="move-attribute attribute-row">
      <label>Generation:</label>
      <span class="attribute-value">{{generationName}}  ({{generationVersionsStr}})</span>
    </div>
    <div class="move-attribute">
      <label>Type:</label>
      <span class="attribute-value" v-if="moveType"><type-label :type="moveType" /></span>
    </div>
    <div class="move-attribute">
      <label>Power:</label>
      <span class="attribute-value">{{move.power||'-'}}</span>
    </div>
    <div class="move-attribute">
      <label>Accuracy:</label>
      <span class="attribute-value" v-if="move.accuracy">{{move.accuracy}}%</span>
      <span class="attribute-value" v-if="!move.accuracy">-</span>
    </div>
    <div class="move-attribute">
      <label>PP:</label>
      <span class="attribute-value">{{move.pp}}</span>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import TypeLabel from '@/components/Type/TypeLabel'

export default {
  name: 'MoveAttributes',
  components: { TypeLabel },
  props: {
    move: {
      type: Object,
      required: true
    }
  },
  data: () => {
    return {
      
    }
  },
  beforeMount() {
    this.getGenerations()
    this.getGenerationsVersions()
    this.getTypes()
    this.getVersions()
  },
  computed: {
    ...mapGetters(['generation', 'generationVersionsName', 'type']),
    generationName: function() {
      const generation = this.generation(this.move.generation_id)
      return generation?generation.t_name||generation.name:'-'
    },
    generationVersionsStr: function() {
      return this.generationVersionsName(this.move.generation_id).join(', ')
    },
    moveType: function() {
      return this.type(this.move.type_id)
    }
  },
  methods: {
    ...mapActions(['getGenerations', 'getGenerationsVersions', 'getTypes', 'getVersions']),
  },
}
</script>

<style lang="scss">
.move-attributes {
  .move-attribute {
    @extend .attribute-row;
    margin: $margin-global-medium;
  }
}
</style>
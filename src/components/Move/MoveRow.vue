<template>
  <div class="move-row" v-if="move">
    <div class="attr name">
      <router-link :to="{name: 'move', params: {id: move.id}}">
        {{move.t_name||move.name}}
      </router-link>
    </div>
    <div v-if="pokemonMove && showLevel" class="attr level">{{pokemonMove.level}}</div>
    <div class="attr pp">{{move.pp}}</div>
    <div class="attr power">{{move.power||'-'}}</div>
    <div class="attr accuracy">{{move.accuracy?move.accuracy+'%':'-'}}</div>
    <div class="attr type"><type-label :type="moveType"/></div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import TypeLabel from '@/components/Type/TypeLabel'

export default {
  name: 'MoveRow',
  components: {TypeLabel},
  props: {
    move: {
      type: Object,
      required: true
    },
    pokemonMove: {
      type: Object
    },
    showLevel: {
      type: Boolean,
      default: false,
    }
  },
  beforeMount: function() {
    if (this.allTypes.length === 0) {
      this.getTypes()
    }
  },
  computed: {
    ...mapGetters(['allTypes', 'type']),
    moveType: function() {
      return this.type(this.move.type_id)
    },
    typeName: function() {
      const type = this.type(this.move.type_id)
      return type?type.t_name||type.name:'-'
    }
  },
  methods: {
    ...mapActions(['getTypes'])
  }
}
</script>

<style lang="scss">
.move-row {
  display: table-row;
  font-size: 14px;

  &:nth-child(2n+1) {
    background: transparentize($color: $pokedex-blue, $amount: .9);
  }

  .attr {
    display: table-cell;
    padding: $padding-global-small;
    text-align: center;

    &:first-child {
      padding-left: 0;
    }
  }
  .name {
    text-align: left;
  }
}
</style>
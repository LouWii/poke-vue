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
    <div class="attr type">{{typeName}}</div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'MoveRow',
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
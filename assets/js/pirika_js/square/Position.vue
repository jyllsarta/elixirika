<template lang="pug">
  .position
    .index
      | {{name}}
    .field
      Card(v-for="card in field.cards", :number="card.number", :suit="card.suit", :selected="card.selected", :key="card.id")

</template>

<script lang="typescript">
  import Vue from 'vue';
  import Card from "./Card.vue";

  export default Vue.extend({
    components: {
      Card,
    },
    props: {
      field: Object,
      name: String,
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/constants";
  .position{
    display: flex;
    .index{
      width: 200px;
    }
    .field{
      width: 500px;
    }
  }
</style>

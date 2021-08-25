<template lang="pug">
  .position(:class="nameBold ? 'bold' : ''")
    .index
      | {{name}}
    .count
      | {{field.cards.length}}
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
      nameBold: Boolean,
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
    .count{
      width: 30px;
      margin-right: 10px;
    }
    .field{
      width: 550px;
    }
  }
  .bold{
    font-weight: bold;
  }
</style>

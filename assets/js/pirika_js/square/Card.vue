<template lang="pug">
  .card(:class="card.selected ? 'bold' : ''")
    .brak
      | [
    .number(:class="card.category !== 'normal' ? card.suit : ''")
      | {{ card.number }}
    .suit(:class="card.suit")
      | {{ card.suit }}
    .brak
      | ]

</template>

<script lang="typescript">
  import Vue from 'vue';
  import Card from './packs/card';
  export default Vue.extend({
    props: {
      card: Card
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/constants";
  .card{
    display: inline-block;
    width: 5ch;
    div{
      text-align: right;
      display: inline-block;
    }
    .number{
      width: 2ch;
    }
    .s{
      background-color: rgb(212, 254, 255);
    }
    .d{
      background-color: rgb(252, 255, 166);
    }
    .c{
      background-color: rgb(220, 255, 211);
    }
    .h{
      background-color: rgb(255, 211, 218);
    }
    .X{
      background-color: rgb(255, 219, 118);
    }
  }
  .bold{
    font-weight: bold;
  }
</style>

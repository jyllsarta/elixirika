<template lang="pug">
  .card(:class="selected ? 'bold' : ''")
    .brak
      | [
    .number
      | {{ number }}
    .suit(:class="suit")
      | {{ suit }}
    .brak
      | ]

</template>

<script lang="typescript">
  import Vue from 'vue';
  export default Vue.extend({
    props: {
      number: Number,
      suit: String,
      selected: Boolean,
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

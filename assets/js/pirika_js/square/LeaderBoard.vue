<template lang="pug">
  .high_score
    .index
      | ハイスコア： {{high_score}}

</template>

<script lang="typescript">
  import Vue from 'vue';
  import axios from "axios";

  export default Vue.extend({
    data: ()=>{
      return {
        high_score: 0,
      }
    },
    mounted(){
      this.fetchMyScore();
    },
    methods: {
      fetchMyScore(){
        axios.get(`/square/status?username=${localStorage.rawNameSquare || ''}`)
        .then((results) => {
          console.log(results);
          console.log("OK");
          this.high_score = results.data.high_score;
        })
        .catch((results) => {
          console.warn(results);
          console.warn("NG");
        })
      },
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/constants";
  .high_score{
    .index{
      width: 200px;
    }
  }
</style>

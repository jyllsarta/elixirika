<template lang="pug">
  .high_score
    .index
      | ピリカのハイスコア： {{pirikaHighScore}} / チャレンジ： {{pirikaChallenges}}
    .index
      | ミズハのハイスコア： {{mizuhaHighScore}} / チャレンジ: {{mizuhaChallenges}}

</template>

<script lang="typescript">
  import Vue from 'vue';
  import axios from "axios";

  export default Vue.extend({
    data: ()=>{
      return {
        status: {
          high_score: [],
          challenges: {
            "1": [],
            "2": [],
          },
        },
      }
    },
    mounted(){
      this.fetchMyScore();
    },
    methods: {
      fetchMyScore(){
        const params = {
          username: localStorage.rawNameSquare
        }
        axios.get(`/square/status`, {params: params})
        .then((results) => {
          console.log(results);
          console.log("OK");
          this.status = results.data;
        })
        .catch((results) => {
          console.warn(results);
          console.warn("NG");
        })
      },
    },
    computed: {
      pirikaHighScore(){
        return this.status.high_score.find(score=>score.character_id==1)?.score || 0;
      },
      mizuhaHighScore(){
        return this.status.high_score.find(score=>score.character_id==2)?.score || 0;
      },
      pirikaChallenges(){
        return this.status.challenges[1] || [];
      },
      mizuhaChallenges(){
        return this.status.challenges[2] || [];
      },
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/global_settings";
  .high_score{
    .index{
      width: 500px;
    }
  }
</style>

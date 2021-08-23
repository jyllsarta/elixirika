<template lang="pug">
  #app
    h1
      | すくえあ！
    p
      | {{ logic.deck }}

</template>

<script lang="typescript">
    import Vue from 'vue';
    import Logic from "./packs/logic";

    export default Vue.extend({
    components: {
    },
    mounted(){
      this.logic = new Logic();
    },
    data(){
      return {
        logic: {},
      };
    },
  })
</script>

<style lang='scss' scoped>
  @import "stylesheets/constants";
</style>

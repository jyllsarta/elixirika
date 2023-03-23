<template>
  <div>
    <h2>state:</h2>
    <div>
      {{state}}      
    </div>
  </div>
</template>

<script>
import State from "./packs/state";

export default {
  data(){
    return {
      state: null,
    }
  },
  mounted(){
    this.state = new State();
    window.state = this.state;
  }
};
</script>

<style lang="scss">
@import "stylesheets/global_settings";
</style>

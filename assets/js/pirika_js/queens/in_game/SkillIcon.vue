<template>
  <div class="skill tentative_button" :class="{disabled: disabled}">
    {{ stringRepresentation }}
  </div>
</template>

<script>
import store from "../packs/store";

export default {
  store, 
  props: {
    disabled: Boolean,
    skill: Object,
  },
  computed: {
    stringRepresentation(){
      if(this.skill.is_instant){
        return this.skill.name;
      }
      return this.skill.name + "(" + this.skill.cost + ")";
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../stylesheets/global_settings";
.skill{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &.disabled{
    opacity: 0.5;
  }
}
</style>

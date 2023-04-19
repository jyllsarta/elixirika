<template>
<div class="field" v-if="field">
  <div class="value">
    V: {{showValue ? field.targetValue() : '-'}}
  </div>
  <div class="cards">
    <div class="card" v-for="card in field.cards" :key="card.id" :class="{canClick: canClick}" @click="$emit('click-card', card.id)">
      {{hidden ? '-' : card.n}}
    </div>
  </div>
</div>
</template>

<script>
import Field from './packs/model/field'

export default {
  props: {
    field: Field,
    hidden: Boolean,
    showValue: Boolean,
    canClick: Boolean,
  },
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.field{
  display: flex;
  height: 70px;
  align-items: center;
  background-color: $bg3;
  border: 1px solid $gray3;
  padding: 5px;
  .value{
    font-size: 20px;
    width: 20%;
  }
  .cards{
    width: 80%;
    display: flex;
    padding: 5px;
    gap: 10px;
    .card{
      border: 1px solid $base1;
      background-color: $base3;
      width: 60px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .canclick{
      cursor: pointer;
    }
  }
}
</style>

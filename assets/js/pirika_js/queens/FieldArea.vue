<template>
<div class="field" v-if="field">
  <div class="value">
    V: {{showValue ? field.targetValue() : '-'}}
  </div>
  <div class="cards">
    <div class="card" v-for="card in field.cards" :key="card.id" @click="$emit('click-card', card.id)">
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
    showValue: Boolean
  },
}
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.field{
  .value{
    font-size: 20px;
  }
  .cards{
    display: flex;
    padding: 5px;
    gap: 10px;
    .card{
      border: 1px solid white;
      background-color: #35313a;
      width: 80px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>

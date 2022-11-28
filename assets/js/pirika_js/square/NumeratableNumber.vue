<template>
    <div class="_number" :class="{changing}">{{Math.floor(currentNumber)}}</div>
</template>

<script>
export default {
  props: {
    number: Number,
    speed: Number,
    scaled: Boolean,
  },
  data: () => ({
    currentNumber: -1,
    updateRatio: 0.1, // 毎フレーム何％目標値に近づけるか
    changing: false,
  }),
  computed: {
  },
  mounted() {
    this.currentNumber = this.number;
    this.changing = false;
    if (this.speed) {
      this.updateRatio = this.speed;
    }
  },
  watch: {
    number() {
      this.react();
    },
  },
  methods: {
    react() {
      this.currentNumber = (1 - this.updateRatio) * this.currentNumber + (this.updateRatio) * this.number;
      this.changing = true;
      if (Math.abs(this.currentNumber - this.number) < 1.01) {
        setTimeout(() => this.changing = false, 1000);
        this.currentNumber = this.number;
      }
      if (Math.floor(this.currentNumber) != Math.floor(this.number)) {
        setTimeout(() => this.react(), 20);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
._number{
  transition: transform 0.1s linear;
}
.changing{
  transform: scale(3) translateY(-3px);
}
</style>

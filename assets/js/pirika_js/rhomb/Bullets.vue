<template>
  <div class="field">
    <canvas class="lines" ref="canvas" width="1200" height="800"></canvas>
    <div class="bullets">
      <div class="bullet">
        <Bullet
          v-for="bullet in bullets"
          :key="bullet.id"
          :style="bulletStyle(bullet)"
          :type="bullet.type"
          :marked-at="bullet.markedAt"
        ></Bullet>
      </div>
    </div>
  </div>
</template>

<script>
import Bullet from "./Bullet.vue";
import Model from "./packs/model";

export default {
  components: {
    Bullet,
  },
  props: {
    model: Model,
  },
  mounted() {
    this.drawLines();
  },
  methods: {
    bulletStyle(bullet) {
      const appliedTick =
        bullet.markedAt !== null ? bullet.markedAt : this.model.tick;
      const position = bullet.partialStrokeAppliedPosition(appliedTick);
      return {
        transform: `translate(${position.x}px, ${position.y}px)`,
      };
    },
    drawLines() {
      const { canvas } = this.$refs;
      const context = canvas?.getContext("2d");
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, 1200, 800);
      context.translate(0.5, 0.5);
      context.setLineDash([4, 10]);

      for (const bullet of this.bullets) {
        // TODO(jyllsarta): type === color は偶然の一致なのでマスタ管理にする
        context.strokeStyle = bullet.type;
        context.beginPath();
        let { x } = bullet;
        let { y } = bullet;
        context.moveTo(x, y);
        for (const stroke of bullet.strokes) {
          x += stroke.dx;
          y += stroke.dy;
          context.lineTo(x, y);
        }
        context.stroke();
      }
    },
  },
  computed: {
    bullets() {
      return this.model.bullets || [];
    },
  },
  watch: {
    "model.turn": function() {
      this.drawLines();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "stylesheets/global_settings";
.lines {
  position: absolute;
  width: 100%;
  height: 100%;
}
.bullets {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  .bullet {
    position: absolute;
    transform: translate(-15px, -15px);
  }
}
</style>

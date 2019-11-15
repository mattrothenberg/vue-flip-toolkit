<template>
  <div>
    <Flipper :flip-key="focused">
      <div class="flex items-center h-screen justify-center" v-if="focused === null">
        <div v-for="color in colors" :key="color">
          <Flipped :flip-id="color" translate scale>
            <div
              class="mx-3"
              @click="setFocused(color)"
              role="button"
              :style="{backgroundColor: color}"
            >
              <Flipped :inverse-flip-id="color">
                <div class="square font-mono text-xs flex items-center justify-center text-white">
                  <Flipped :flip-id="`hex-${color}`">
                    <span>{{ color }}</span>
                  </Flipped>
                </div>
              </Flipped>
            </div>
          </Flipped>
        </div>
      </div>
      <Flipped :flip-id="focused" v-else @on-start="handleStart">
        <div
          @click="setFocused(focused)"
          class="full-screen-square flex flex-col"
          :style="{backgroundColor: focused}"
        >
          <Flipped :inverse-flip-id="focused">
            <div class="flex-auto">
              <div class="font-mono text-xs text-white p-4 text-center font-bold">
                <Flipped :flip-id="`hex-${focused}`">
                  <span>{{ focused }}</span>
                </Flipped>
              </div>
              <div class="opacity-grid flex-auto h-full">
                <div
                  :style="{backgroundColor: `rgba(0, 0, 0, ${index/40})`}"
                  class="opacity-grid-square p-4"
                  v-for="(num, index) in Array(16)"
                  :key="num"
                ></div>
              </div>
            </div>
          </Flipped>
        </div>
      </Flipped>
    </Flipper>
  </div>
</template>

<script>
import Flipper from "../src/Flipper";
import Flipped from "../src/Flipped";
import anime from "animejs";

export default {
  name: "scale",
  components: {
    Flipper,
    Flipped
  },
  data() {
    return {
      focused: null,
      colors: ["#ff4f66", "#7971ea", "#5900d8"]
    };
  },
  methods: {
    setFocused(index) {
      if (index === this.focused) {
        this.focused = null;
      } else {
        this.focused = index;
      }
    },
    handleStart({ el, id }) {
      const squares = el.querySelectorAll(".opacity-grid-square");
      anime({
        targets: squares,
        opacity: [0, 1],
        delay: anime.stagger(40, { easing: "easeINQuad" })
      });
    }
  }
};
</script>

<style lang="css" scoped>
.square {
  height: 100px;
  width: 100px;
}

.wrap {
  transition: background 0.2s ease-out;
}

.wrap.open {
  background: rgba(0, 0, 0, 1);
}

.full-screen-square {
  width: 600px;
  height: 600px;
  position: fixed;
  margin: auto;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}

.opacity-grid {
  height: 555px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: grid;
  grid-gap: 0;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, calc(555px / 4));
  grid-auto-flow: row;
}

.opacity-grid-square {
  opacity: 0;
}
</style>

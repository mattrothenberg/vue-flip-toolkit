<template>
  <div class="flex items-center justify-center h-screen">
    <Flipper :flipKey="toggled">
      <div class="phone shadow bg-white relative">
        <div class="screen bg-grey"></div>
        <div class="body bg-red"></div>
        <Flipped flipId="fab" v-if="!toggled">
          <div
            tabindex="0"
            ref="showSlidePanel"
            @click="toggle"
            @keyup.enter="toggle"
            role="button"
            class="fab bg-pink w-16 h-16 rounded-full absolute"
          ></div>
        </Flipped>
        <Flipped flipId="fab" v-if="toggled" @on-complete="handleEnter">
          <div role="button" class="bg-pink w-full h-full pin absolute overflow-hidden">
            <transition @enter="handleSlidePanelLoaded" @leave="handleSlidePanelOut">
              <div
                v-if="slidePanelLoaded"
                class="bg-white absolute w-full pin-b white-slide-panel p-4"
              >
                <div class="w-full flex items-end h-full">
                  <div class="flex flex-col w-full">
                    <div class="h-10 bg-grey-light w-full mb-4"></div>
                    <div class="h-10 bg-grey-light w-full mb-4"></div>
                    <button
                      ref="hideSlidePanel"
                      @click="hideSlidePanel"
                      class="bg-green h-10 w-full"
                    ></button>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </Flipped>
      </div>
    </Flipper>
  </div>
</template>

<script>
import Flipper from "../src/Flipper";
import Flipped from "../src/Flipped";
import anime from "animejs";
export default {
  name: "material",
  components: {
    Flipper,
    Flipped
  },
  data() {
    return {
      toggled: false,
      slidePanelLoaded: false
    };
  },
  methods: {
    toggle() {
      this.toggled = !this.toggled;
    },
    handleEnter({ el }) {
      this.slidePanelLoaded = true;
    },
    hideSlidePanel() {
      this.slidePanelLoaded = false;
    },
    handleSlidePanelLoaded(el, done) {
      anime({
        targets: el,
        opacity: [0, 1],
        translateY: [100, 0],
        duration: 400,
        easing: "easeOutSine",
        complete: () => {
          done();
          this.$nextTick(() => {
            this.$refs.hideSlidePanel.focus();
          });
        }
      });
    },
    handleSlidePanelOut(el, done) {
      anime({
        targets: el,
        opacity: [1, 0],
        translateY: [0, 100],
        duration: 400,
        easing: "easeOutSine",
        complete: () => {
          done();
          this.toggled = false;
          this.$nextTick(() => {
            this.$refs.showSlidePanel.focus();
          });
        }
      });
    }
  }
};
</script>


<style scoped>
.phone {
  width: 300px;
  height: 500px;
  overflow: hidden;
}

.screen {
  height: 200px;
  z-index: 0;
  pointer-events: none;
}

.fab {
  right: 16px;
  top: calc(200px - 2rem);
}

.white-slide-panel {
  height: 40%;
  box-shadow: 0 -8px 20px rgba(0, 0, 0, 0.08);
  will-change: transform;
}
</style>

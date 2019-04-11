<template>
  <div>
    <Flipped class="card-detail" :flipId="flipId" @on-complete="handleComplete">
      <div>
        <div class="header p-4 border-b border-grey">
          <transition @enter="handleHeaderEnter">
            <div v-if="loaded">
              <router-link
                class="no-underline text-xs uppercase tracking-wide inline-block mb-1"
                :to="`/`"
              >Back</router-link>
              <h1 class="text-xl">{{ iconSet.label }}</h1>
            </div>
          </transition>
        </div>
        <div class="p-4">
          <div class="icon-grid mt-4">
            <Flipped v-for="icon in iconSet.icons" :key="icon" :flipId="icon">
              <div class="icon bg-grey"></div>
            </Flipped>
          </div>
        </div>
      </div>
    </Flipped>
  </div>
</template>

<script>
import Flipped from "../src/Flipped";
import anime from "animejs";
import iconData from "./icon-data";

export default {
  name: "IconsHome",
  components: {
    Flipped
  },
  data() {
    return {
      icons: Array(16),
      loaded: false
    };
  },
  computed: {
    iconSet() {
      return iconData.find(set => set.slug === this.$route.params.set);
    },
    flipId() {
      return this.$route.params.set;
    }
  },
  methods: {
    handleComplete({ el, id }) {
      this.loaded = true;
      // const gridItems = el.querySelectorAll(".icon");
      // anime({
      //   targets: gridItems,
      //   opacity: [0, 1],
      //   delay: anime.stagger(100)
      // });
    },
    handleHeaderEnter(el, done) {
      anime({
        targets: el,
        easing: "linear",
        opacity: [0, 1],
        duration: 300,
        translateY: [10, 0],
        complete: function() {
          done();
        }
      });
    }
  }
};
</script>

<style scoped>
.header {
  min-height: 77px;
}
.card-detail {
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
</style>

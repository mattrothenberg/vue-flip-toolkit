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
            <template v-for="icon in iconSet.icons">
              <Flipped
                v-if="icon.flipped"
                :flipId="`${iconSet.slug}-${icon.key}`"
                :key="`${iconSet.slug}-${icon.key}`"
              >
                <div class="icon flipped bg-green"></div>
              </Flipped>
              <div v-else class="icon bg-grey" :key="`${iconSet.slug}-${icon.key}`"></div>
            </template>
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
      const nonFlippable = el.querySelectorAll(".icon:not(.flipped)");

      anime({
        targets: nonFlippable,
        opacity: [0, 1],
        duration: 3000,
        delay: anime.stagger(50)
      });
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

.icon:not(.flipped) {
  opacity: 0;
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

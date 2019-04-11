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
              <h1 class="text-xl">{{flipId}}</h1>
            </div>
          </transition>
        </div>
        <div>
          <div class="icon-grid">
            <div class="flex items-center justify-center p-4" v-for="icon in icons" :key="icon">
              <div class="icon bg-grey"></div>
            </div>
          </div>
        </div>
      </div>
    </Flipped>
  </div>
</template>

<script>
import Flipped from "../src/Flipped";
import anime from "animejs";

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
    flipId() {
      return this.$route.params.set;
    }
  },
  methods: {
    handleComplete({ el, id }) {
      this.loaded = true;
      const gridItems = el.querySelectorAll(".icon");
      anime({
        targets: gridItems,
        opacity: [0, 1],
        delay: anime.stagger(100)
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

.icon-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;
}

.icon {
  width: 48px;
  height: 48px;
  border-radius: 4px;
  opacity: 0;
}
</style>

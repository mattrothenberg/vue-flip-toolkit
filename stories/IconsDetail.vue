<template>
  <Flipped :flip-id="flipId" @on-complete="handleComplete">
    <div class="card-detail">
      <Flipped :inverse-flip-id="flipId">
        <div class="flex h-full">
          <div class="w-1/2 border-r">
            <div class="p-6">
              <router-link
                class="text-xs text-green uppercase tracking-wide inline-block mb-2 no-underline"
                to="/"
              >Back</router-link>
              <h1 class="text-xl mb-4 font-semibold">{{ iconSet.label }}</h1>
              <p
                class="flow text-grey"
              >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto beatae iure omnis magnam perspiciatis voluptatibus, sunt vero quam debitis vitae consectetur voluptas molestias inventore reprehenderit quae aliquam veniam ad eius.</p>
              <p
                class="flow text-grey my-3"
              >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto beatae iure omnis magnam perspiciatis voluptatibus, sunt vero quam debitis vitae consectetur voluptas molestias inventore reprehenderit quae aliquam veniam ad eius.</p>
              <p
                class="flow text-grey my-3"
              >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto beatae iure omnis magnam perspiciatis voluptatibus, sunt vero quam debitis vitae consectetur voluptas molestias inventore reprehenderit quae aliquam veniam ad eius.</p>
            </div>
          </div>
          <div class="w-1/2 p-6 overflow-y-auto">
            <div class="icon-grid">
              <template v-for="icon in fullIconSet">
                <Flipped
                  v-if="icon.flipped"
                  :flip-id="`${iconSet.slug}-${icon.key}`"
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
  </Flipped>
</template>

<script>
import Flipped from "../src/Flipped";
import anime from "animejs";
import iconData from "./icon-data";

const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

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
    },
    fullIconSet() {
      const randomIcons = Array.from(Array(20), (x, index) => ({
        flipped: false,
        key: index.toString()
      }));
      return shuffle(this.iconSet.icons.concat(randomIcons));
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

.icon {
  width: 64px;
  height: 64px;
}

.icon:not(.flipped) {
  opacity: 0;
}

.card-detail {
  position: fixed;
  width: 100%;
  height: 100%;
  background: white;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 64px;
  grid-gap: 24px;
  grid-auto-flow: dense;
}
</style>

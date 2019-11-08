<template>
  <Flipper :flipKey="focused" :staggerConfig="staggerConfig">
    <div class="m-4">
      <div v-for="(num, index) in list" :key="index">
        <Flipped
          :shouldInvert="shouldFlip(index)"
          :flipId="`card-${index}`"
          v-if="index !== focused"
          stagger="card"
        >
          <div
            @click="toggleItem(index)"
            role="button"
            class="bg-grey h-8 my-4 flex items-center p-4"
          >
            <Flipped :inverseFlipId="`card-${index}`">
              <div>
                <Flipped
                  :delayUntil="`card-${index}`"
                  :shouldFlip="shouldFlip(index)"
                  :flipId="`avatar-card-${index}`"
                >
                  <div class="bg-grey-dark rounded-full w-3 h-3"></div>
                </Flipped>
              </div>
            </Flipped>
          </div>
        </Flipped>
        <Flipped :flipId="`card-${index}`" v-else stagger="card">
          <div
            @click="toggleItem(index)"
            role="button"
            class="bg-grey h-32 my-4 flex items-center justify-center p-4"
          >
            <Flipped :inverseFlipId="`card-${index}`">
              <div>
                <Flipped
                  delayUntil="foo"
                  :shouldFlip="shouldFlip(index)"
                  :flipId="`avatar-card-${index}`"
                >
                  <div class="bg-grey-dark rounded-full w-12 h-12"></div>
                </Flipped>
              </div>
            </Flipped>
          </div>
        </Flipped>
      </div>
    </div>
  </Flipper>
</template>

<script>
import Flipper from "../src/Flipper";
import Flipped from "../src/Flipped";

export default {
  name: "Accordion",
  components: {
    Flipper,
    Flipped
  },
  data() {
    return {
      focused: null,
      list: Array(8)
        .fill()
        .map(() => ({
          open: false
        }))
    };
  },
  methods: {
    handleStart({ el, id }) {
      setTimeout(() => {
        el.classList.add("animated-in");
      }, 600);
    },
    handleComplete({ el, id }) {},
    shouldFlip(index) {
      return (prev, current) => {
        return index === prev || index === current;
      };
    },
    toggleItem(index) {
      if (this.focused === index) {
        this.focused = null;
      } else {
        this.focused = index;
      }
      this.list[index].open = !this.list[index].open;
    }
  },
  computed: {
    staggerConfig() {
      return {
        card: {
          reverse: this.focused === null,
          speed: 0.1
        }
      };
    },
    key() {
      return this.list.map(item => item.open.toString()).join("");
    }
  }
};
</script>


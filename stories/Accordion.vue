<template>
  <Flipper :flipKey="focused" spring="gentle" :staggerConfig="staggerConfig">
    <div class="m-4">
      <div v-for="(num, index) in list" :key="index">
        <Flipped :flipId="`card-${index}`" v-if="index !== focused" stagger="card">
          <div @click="toggleItem(index)" role="button" class="bg-grey h-8 my-4"></div>
        </Flipped>
        <Flipped :flipId="`card-${index}`" v-else stagger="card">
          <div @click="toggleItem(index)" role="button" class="bg-grey h-32 my-4"></div>
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
      list: Array(6)
        .fill()
        .map(() => ({
          open: false,
          description: ["a", "b", "c"]
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
          // reverse: true,
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


<template>
  <Flipper :flipKey="focused" :staggerConfig="staggerConfig">
    <div class="m-4">
      <div v-for="(num, index) in list" :key="index">
        <Flipped
          :flipId="`card-${index}`"
          stagger="card"
          :shouldInvert="shouldFlip(index)"
          v-if="index !== focused"
        >
          <div @click="toggleItem(index)" role="button" class="bg-grey my-4">
            <Flipped class="min-h-4 p-4" :inverseFlipId="`card-${index}`">
              <div>
                <Flipped
                  :delayUntil="`card-${index}`"
                  :shouldFlip="shouldFlip(index)"
                  :flipId="`avatar-card-${index}`"
                >
                  <div class="inline-block bg-grey-dark rounded-full w-3 h-3"></div>
                </Flipped>
              </div>
            </Flipped>
          </div>
        </Flipped>
        <Flipped :flipId="`card-${index}`" v-else stagger="card">
          <div @click="toggleItem(index)" role="button" class="bg-grey my-4 text-center">
            <Flipped class="h-32 p-4" :inverseFlipId="`card-${index}`">
              <div>
                <Flipped
                  :delayUntil="`card-${index}`"
                  :shouldFlip="shouldFlip(index)"
                  :flipId="`avatar-card-${index}`"
                >
                  <div class="inline-block bg-grey-dark rounded-full w-12 h-12"></div>
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
        .map((_, i) => ({
          open: false,
          label: `Card ${i + 1}`
        }))
    };
  },
  methods: {
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
          speed: 1
        }
      };
    },
    key() {
      return this.list.map(item => item.open.toString()).join("");
    }
  }
};
</script>


<template>
  <div class="about p-4">
    <button
      class="bg-grey text-grey-darkest uppercase text-xs font-bold tracking-wide p-2"
      @click="trigger"
    >Trigger Animation</button>
    <Flipper :flip-key="flipKey">
      <Flipped flip-id="square">
        <div class="square" :class="squareClass"></div>
      </Flipped>
    </Flipper>
  </div>
</template>

<script>
import Flipper from "../src/Flipper";
import Flipped from "../src/Flipped";
export default {
  components: {
    Flipped,
    Flipper
  },
  name: "simple",
  data() {
    return {
      flipper: null,
      open: false
    };
  },
  computed: {
    squareClass() {
      return this.open ? "expanded" : "";
    },
    flipKey() {
      return this.open.toString();
    }
  },
  methods: {
    trigger() {
      this.open = !this.open;
    }
  }
};
</script>

<style scoped>
button {
  margin-bottom: 1rem;
}

.square {
  height: 50px;
  width: 200px;
  background: pink;
  align-items: center;
  padding: 16px;
}

.square.expanded {
  height: 200px;
  width: 250px;
  text-align: center;
}
</style>

<template>
  <div class="wrap">
    <Flipper :flipKey="key">
      <Flipped :on-start="handleStart" flipId="square" v-if="!open">
        <div class="square" @click="toggle"></div>
      </Flipped>
      <Flipped flipId="square" v-else>
        <div class="full-screen-square" @click="toggle"></div>
      </Flipped>
    </Flipper>
  </div>
</template>


<script>
import Flipper from "../src/Flipper";
import Flipped from "../src/Flipped";

export default {
  name: "double",
  components: {
    Flipper,
    Flipped
  },
  data() {
    return {
      open: false
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    handleStart(el) {
      console.log("Starting", el);
    },
    handleComplete(el) {
      console.log("Complete", el);
    }
  },
  computed: {
    key() {
      return this.open.toString();
    }
  }
};
</script>

<style scoped>
.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.square {
  width: 5rem;
  height: 5rem;
  cursor: pointer;
  background-color: #7971ea;
}

.full-screen-square {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: #ff4c46;
}
</style>

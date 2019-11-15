<template>
  <div class="p-4">
    <Flipper :flip-key="key">
      <button
        class="bg-grey text-grey-darkest uppercase text-xs font-bold tracking-wide p-2"
        @click="shuffle"
      >shuffle</button>
      <ul class="list mt-4">
        <Flipped v-for="num in list" :key="num" :flip-id="num.toString()" :stagger="stagger">
          <li>{{num}}</li>
        </Flipped>
      </ul>
    </Flipper>
  </div>
</template>

<script>
const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};
import Flipper from "../src/Flipper";
import Flipped from "../src/Flipped";

export default {
  name: "list",
  props: ["stagger"],
  components: {
    Flipper,
    Flipped
  },
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  },
  methods: {
    shuffle() {
      this.list = shuffle(this.list);
    }
  },
  computed: {
    key() {
      return this.list.join("");
    }
  }
};
</script>

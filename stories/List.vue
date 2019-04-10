<template>
  <div>
    <Flipper :flipKey="key">
      <button @click="shuffle">shuffle</button>
      <ul class="list">
        <Flipped v-for="num in list" :key="num" :flipId="num.toString()">
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

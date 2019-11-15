<template>
  <div>
    <Flipper :flip-key="key" stagger="gentle">
      <router-view/>
    </Flipper>
  </div>
</template>

<script>
import Flipper from "../src/Flipper";
export default {
  name: "IconsRouterWrap",
  components: {
    Flipper
  },
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>

<template>
  <div>
    <slot v-if="ready"></slot>
  </div>
</template>

<script>
import Flipper from "react-flip-toolkit/es/core";
export default {
  name: "flipper",
  provide() {
    return {
      addFlippedElement: this.addFlippedElement,
      addInvertedElement: this.addInvertedElement
    };
  },
  props: {
    spring: {
      type: String,
      default: "noWobble"
    },
    flipKey: String,
    staggerConfig: Object
  },
  data() {
    return {
      flipInstance: null,
      ready: false
    };
  },
  methods: {
    addFlippedElement({
      element,
      flipId,
      stagger,
      shouldFlip,
      shouldInvert,
      onStart,
      onComplete
    }) {
      this.flipInstance.addFlipped({
        element,
        flipId,
        ...(stagger ? { stagger } : undefined),
        ...(shouldFlip ? { shouldFlip } : undefined),
        ...(shouldInvert ? { shouldInvert } : undefined),
        ...(onStart ? { onStart } : undefined),
        ...(onComplete ? { onComplete } : undefined)
      });
    },
    addInvertedElement({ element, parent }) {
      this.$nextTick(() => {
        this.flipInstance.addInverted({
          element,
          parent
        });
      });
    }
  },
  mounted() {
    this.flipInstance = new Flipper({
      element: this.$el,
      spring: this.spring,
      ...(this.staggerConfig ? { staggerConfig: this.staggerConfig } : null)
    });
    this.ready = true;
  },
  beforeUpdate() {
    this.flipInstance.recordBeforeUpdate();
  },
  watch: {
    flipKey(nv, ov) {
      if (nv !== ov) {
        this.$nextTick(() => {
          this.flipInstance.onUpdate();
        });
      }
    }
  }
};
</script>

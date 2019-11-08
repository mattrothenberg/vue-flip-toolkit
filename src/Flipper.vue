<template>
  <div :class="className">
    <slot v-if="ready"></slot>
  </div>
</template>

<script>
import { Flipper } from "flip-toolkit";
export default {
  name: "flipper",
  provide() {
    return {
      addFlippedElement: this.addFlippedElement,
      addInvertedElement: this.addInvertedElement
    };
  },
  props: {
    className: String,
    flipKey: [String, Number, Boolean],
    staggerConfig: Object,
    spring: {
      type: [String, Object],
      default: "noWobble"
    }
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
      delayUntil,
      stagger,
      shouldFlip,
      shouldInvert,
      onStart,
      onComplete,
      opacity,
      scale,
      translate
    }) {
      this.flipInstance.addFlipped({
        element,
        flipId,
        ...(delayUntil ? { delayUntil } : undefined),
        ...(stagger ? { stagger } : undefined),
        ...(shouldFlip ? { shouldFlip } : undefined),
        ...(shouldInvert ? { shouldInvert } : undefined),
        ...(onStart ? { onStart } : undefined),
        ...(onComplete ? { onComplete } : undefined),
        opacity,
        scale,
        translate
      });
    },
    addInvertedElement({ element, parent, opacity, scale, translate }) {
      this.$nextTick(() => {
        this.flipInstance.addInverted({
          element,
          parent,
          opacity,
          scale,
          translate
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
    flipKey(newKey, oldKey) {
      if (newKey !== oldKey) {
        this.$nextTick(() => {
          this.flipInstance.update(oldKey, newKey);
        });
      }
    },
    staggerConfig(oldConfig, newConfig) {
      if (newConfig !== oldConfig) {
        this.flipInstance.staggerConfig = newConfig;
      }
    }
  }
};
</script>

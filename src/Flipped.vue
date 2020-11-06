<script>
export default {
  name: "flipped",
  inject: ["addFlippedElement", "addInvertedElement"],
  props: {
    flipId: String,
    inverseFlipId: String,
    delayUntil: String,
    stagger: [String, Boolean],
    shouldFlip: Function,
    shouldInvert: Function,
    scale: {
      type: Boolean,
      default: false
    },
    opacity: {
      type: Boolean,
      default: false
    },
    translate: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.flipId) {
      this.addFlippedElement({
        element: this.$el,
        flipId: this.flipId,
        delayUntil: this.delayUntil,
        shouldFlip: this.shouldFlip,
        shouldInvert: this.shouldInvert,
        onStart: el => this.$emit("on-start", { el, id: this.flipId }),
        onComplete: el => this.$emit("on-complete", { el, id: this.flipId }),
        stagger: this.stagger,
        opacity: this.opacity,
        scale: this.scale,
        translate: this.translate
      });
    } else if (this.inverseFlipId) {
      this.addInvertedElement({
        element: this.$el,
        parent: this.$parent.$el,
        opacity: this.opacity,
        scale: this.scale,
        translate: this.translate
      });
    }
  },
  render() {
    return this.$scopedSlots.default()[0];
  }
};
</script>

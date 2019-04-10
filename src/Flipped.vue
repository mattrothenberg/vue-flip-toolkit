<script>
export default {
  name: "flipped",
  inject: ["addFlippedElement", "addInvertedElement"],
  props: {
    flipId: String,
    inverseFlipId: String,
    stagger: String,
    shouldFlip: Function,
    shouldInvert: Function
  },
  mounted() {
    if (this.flipId) {
      this.addFlippedElement({
        element: this.$el,
        flipId: this.flipId,
        shouldFlip: this.shouldFlip,
        shouldInvert: this.shouldInvert,
        onStart: el => this.$emit("on-start", { el, id: this.flipId }),
        onComplete: el => this.$emit("on-complete", { el, id: this.flipId }),
        stagger: this.stagger
      });
    } else if (this.inverseFlipId) {
      this.addInvertedElement({
        element: this.$el,
        parent: this.$parent.$el
      });
    }
  },
  render() {
    return this.$scopedSlots.default({});
  }
};
</script>

import commonjs from "rollup-plugin-commonjs";
import VuePlugin from "rollup-plugin-vue";
import resolve from "rollup-plugin-node-resolve";

export default {
  input: "src/index.js",
  plugins: [commonjs(), VuePlugin(), resolve()],
  output: [
    {
      file: "dist/vue-flip-toolkit.umd.js",
      exports: "named",
      format: "umd",
      name: "VueFlipToolkit"
    },
    {
      file: "dist/vue-flip-toolkit.esm.js",
      format: "esm"
    },
    {
      file: "dist/vue-flip-toolkit.min.js",
      format: "iife",
      exports: "named",
      name: "VueFlipToolkit"
    }
  ]
};

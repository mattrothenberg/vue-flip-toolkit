import commonjs from "rollup-plugin-commonjs";
import VuePlugin from "rollup-plugin-vue";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

export default {
  input: "src/index.js",
  plugins: [
    commonjs(),
    VuePlugin(),
    resolve(),
    babel({ exclude: "node_modules/**" })
  ],
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

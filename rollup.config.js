import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import babelrc from "babelrc-rollup";

import {
  uglify
} from "rollup-plugin-uglify";
export default {
  input: "src/index.js",
  external:['lodash'],
  output: {
    file: "index.js",
    format: "umd",
    name: "EasyStorage",
    sourcemap: true,
  },
  plugins: [
    resolve(),
    babel(
      babelrc({
        addExternalHelpersPlugin: false,
        exclude: /node_modules/,
        runtimeHelpers: false,
      })
    ),
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
      }
    })
  ],
};
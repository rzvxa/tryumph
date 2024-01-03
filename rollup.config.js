/* eslint @typescript-eslint/no-var-requires: "off" */
const resolve = require("@rollup/plugin-node-resolve");
const typescript = require("@rollup/plugin-typescript");
const terser = require("@rollup/plugin-terser");

const extensions = [".js", ".ts"];

exports.default = {
  input: "src/index.ts",
  output: [
    {
      file: "dist/tryumph.common.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/tryumph.common.min.js",
      format: "cjs",
      plugins: [terser()],
      sourcemap: true,
    },
    {
      file: "dist/tryumph.esm.mjs",
      format: "esm",
      sourcemap: true,
    },
    {
      file: "dist/tryumph.esm.min.mjs",
      format: "esm",
      plugins: [terser()],
      sourcemap: true,
    },
    {
      file: "dist/tryumph.umd.js",
      format: "umd",
      name: "tryumph",
      sourcemap: true,
    },
    {
      file: "dist/tryumph.umd.min.js",
      format: "umd",
      name: "tryumph",
      plugins: [terser()],
      sourcemap: true,
    },
  ],
  plugins: [resolve({ extensions }), typescript()],
};

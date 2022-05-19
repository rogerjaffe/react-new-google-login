import sass from "rollup-plugin-sass";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";
import babel from "@rollup/plugin-babel";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    babel({ babelHelpers: "bundled" }),
    sass({ insert: true }),
    typescript(),
  ],
  external: ["react", "react-dom"],
};

import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";

export default {
  input: "src/js/bootstrap-toaster.ts",
  output: [
    {
      dir: "dist/esm",
      format: "esm",
    },
    {
      dir: "dist/umd",
      format: "umd",
      name: "Toast",
    },
  ],
  plugins: [
    typescript(),
    copy({
      targets: [{ src: "src/css", dest: "dist" }],
    }),
  ],
};

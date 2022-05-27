import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import copy from "rollup-plugin-copy";

export default [
  {
    input: "src/js/bootstrap-toaster.ts",
    output: [
      {
        dir: "dist/esm",
        format: "es",
        sourcemap: true,
      },
      {
        dir: "dist/umd",
        format: "umd",
        name: "Toast",
        sourcemap: true,
      },
    ],
    plugins: [
      typescript(),
      copy({
        targets: [{ src: "src/css", dest: "dist" }],
      }),
    ],
  },
  {
    input: "src/js/tsc-out/bootstrap-toaster.d.ts",
    output: [
      {
        file: "dist/esm/bootstrap-toaster.d.ts",
        format: "es",
      },
      {
        file: "dist/umd/bootstrap-toaster.d.ts",
        format: "umd",
      },
    ],
    plugins: [dts()],
  },
];

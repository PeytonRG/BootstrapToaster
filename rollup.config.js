import typescript from "@rollup/plugin-typescript";

export default {
    input: 'src/js/bootstrap-toaster.ts',
    output: {
        // file: `dist/${process.env.format}/bootstrap-toaster.js`,
        dir: `dist/${process.env.format}`,
        format: `${process.env.format}`,
        name: 'BootstrapToaster'
    },
    plugins: [typescript()],

    // output: {
    //     file: 'dist/esm/bootstrap-toaster.js',
    //     // dir: 'dist',
    //     format: 'es'
    // }
};
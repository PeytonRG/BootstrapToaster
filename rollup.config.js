import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";

export default {
    input: 'src/js/bootstrap-toaster.ts',
    output: {
        dir: `dist/${process.env.format}`,
        format: `${process.env.format}`,
        name: 'BootstrapToaster'
    },
    plugins: [
        typescript(),
        copy({
            targets: [
                { src: 'src/css', dest: 'dist' }
            ]
        })
    ]
};
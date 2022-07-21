import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

import { resolve } from "path";

// import libCss from "vite-plugin-libcss";

// export default defineConfig(({ mode }) => {
//   const format = mode === "cjs" ? "cjs" : "es";
//   return {
//     define: {
//       "process.env.BABEL_TYPES_8_BREAKING": "false",
//       "process.platform": '"darwin"',
//       "Buffer.isBuffer": "undefined",
//     },
//     resolve: {
//       alias: {
//         assert: "browser-assert",
//         path: "path-browserify",
//       },
//     },
//     plugins: [
//       vue(),
//       dts({
//         include: ["lib"],
//         outputDir: format,
//       }),
//     ],
//     build: {
//       cssCodeSplit: false,
//       lib: {
//         entry: resolve(__dirname, "lib", "index.ts"),
//         name: "demoEditor",
//         formats: [format],
//       },
//       rollupOptions: {
//         external: [
//           "vue",
//           "@vue/babel-plugin-jsx",
//           "browser-assert",
//           "path-browserify",
//           "@vue/babel-plugin-jsx",
//           "@babel/standalone",
//           "vue/compiler-sfc",
//           "monaco-editor-ex/esm/vs/editor/editor.worker",
//           "monaco-editor-ex/esm/vs/language/html/html.worker",
//           "monaco-editor-ex/esm/vs/language/typescript/ts.worker",
//         ],
//         input: [
//           resolve(__dirname, "lib", "index.ts"),
//           resolve(__dirname, "lib", "markdownPlugin.ts"),
//         ],
//         output: {
//           dir: format,
//         },
//       },
//     },
//   };
// });
export default defineConfig({
  resolve: {
    alias: {
      assert: "browser-assert",
      path: "path-browserify",
    },
  },
  define: {
    "process.env.BABEL_TYPES_8_BREAKING": "false",
    "process.platform": '"darwin"',
    "Buffer.isBuffer": "undefined",
  },
  plugins: [
    vue(),
    dts({
      include: ["lib"],
      outputDir: "dist",
    }),
  ],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, "lib", "index.ts"),
      name: "demoEditor",
      fileName: (format) => `[name].js`,
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@vue/babel-plugin-jsx",
        "@babel/standalone",
        "vue/compiler-sfc",
        "@babel/plugin-transform-typescript",
        "monaco-editor-ex/esm/vs/editor/editor.worker",
        "monaco-editor-ex/esm/vs/language/html/html.worker",
        "monaco-editor-ex/esm/vs/language/typescript/ts.worker",
      ],
      output: {
        dir: "dist",
      },
    },
  },
  optimizeDeps: {
    include: ["browser-assert", "path-browserify"],
  },
});

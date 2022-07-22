import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      assert: "browser-assert",
      path: "path-browserify",
    },
  },
  plugins: [
    vue(),
    dts({
      include: ["lib"],
    }),
  ],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, "lib", "index.ts"),
      name: "demoEditor",
      fileName: (format) => `[name].[format].js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        "vue",
        // "@vue/babel-plugin-jsx",
        // "@babel/standalone",
        // "@babel/plugin-transform-typescript",
        "vue/compiler-sfc",
        "monaco-editor-ex/esm/vs/editor/editor.worker",
        "monaco-editor-ex/esm/vs/language/html/html.worker",
        "monaco-editor-ex/esm/vs/language/typescript/ts.worker",
      ],
    },
  },
  // optimizeDeps: {
  //   include: ["browser-assert", "path-browserify"],
  // },
});

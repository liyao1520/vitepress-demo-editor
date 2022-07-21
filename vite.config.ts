import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

import { resolve } from "path";

export default defineConfig({
  base: "/",
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
        "vue/compiler-sfc",
        "@babel/standalone",
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

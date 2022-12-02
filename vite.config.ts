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
  plugins: [vue(), dts()],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, "lib", "index.ts"),
      name: "demoEditor",
      fileName: "index",
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@vue/babel-plugin-jsx",
        "@vue/runtime-dom",
        "@vue/runtime-core",
        // "@babel/standalone",
        // "@babel/plugin-transform-typescript",
        // "vue/compiler-sfc",
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  optimizeDeps: {
    include: ["browser-assert", "path-browserify", "@babel/core"],
  },
});

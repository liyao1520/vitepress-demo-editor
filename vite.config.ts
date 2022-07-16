import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import libCss from "vite-plugin-libcss";
export default defineConfig({
  plugins: [
    vue(),
    libCss(),
    dts({
      include: ["lib"],
    }),
  ],

  build: {
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, "lib"),
      fileName(format) {
        return `[name].${format}.js`;
      },
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: ["vue"],
      input: [
        resolve(__dirname, "lib", "index.ts"),
        resolve(__dirname, "lib", "markdownPlugin.ts"),
      ],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});

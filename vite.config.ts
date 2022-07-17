import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";

// import libCss from "vite-plugin-libcss";

export default defineConfig({
  plugins: [
    vue(),

    dts({
      include: ["lib"],
    }),
  ],

  build: {
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, "lib"),
      name: "demoEditor",
      fileName: (format) => `[name].${format}.js`,
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: ["vue"],
      input: [
        resolve(__dirname, "lib", "index.ts"),
        resolve(__dirname, "lib", "markdownPlugin.ts"),
      ],
    },
  },
});

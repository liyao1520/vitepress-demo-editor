import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";

// import libCss from "vite-plugin-libcss";

export default defineConfig(({ mode }) => {
  const format = mode === "cjs" ? "cjs" : "es";
  return {
    plugins: [
      vue(),
      dts({
        include: ["lib"],
        outputDir: format,
      }),
    ],
    build: {
      cssCodeSplit: false,
      lib: {
        entry: resolve(__dirname, "lib", "index.ts"),
        name: "demoEditor",
        fileName: (format) => `[name].js`,
        formats: [format],
      },
      rollupOptions: {
        external: ["vue"],
        input: [
          resolve(__dirname, "lib", "index.ts"),
          resolve(__dirname, "lib", "markdownPlugin.ts"),
        ],
        output: {
          dir: format,
        },
      },
    },
  };
});

import { build, normalizePath } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path, { resolve } from "path";

import { fileURLToPath } from "url";

const __filenameNew = fileURLToPath(import.meta.url);

const __dirnameNew = path.dirname(__filenameNew);

build({
  root: "./",
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: normalizePath(
            resolve(__dirnameNew, "../lib/markdownPlugin/index.d.ts")
          ),
          dest: normalizePath(resolve(__dirnameNew, "../markdownPlugin")),
        },
      ],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirnameNew, "../lib/markdownPlugin", "index.ts"),
      fileName: "index",
      formats: ["es", "umd"],
    },
    rollupOptions: {
      output: {
        dir: resolve(__dirnameNew, "../markdownPlugin"),
      },
    },
  },
});

import { resolve } from "path";
import { build } from "vite";

build({
  build: {
    rollupOptions: {
      input: resolve(""),
    },
  },
});

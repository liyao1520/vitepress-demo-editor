import DefaultTheme from "vitepress/theme";
import { App } from "vue";
import { vuePlugin, addImportMap } from "../../../dist/index.es";
// import { vuePlugin, addImportMap } from "../../../lib";
import "../../../dist/style.css";

import "promiseui-vue/dist/index.css";
import dayjs from "dayjs";
let first = true;
export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.use(vuePlugin);
    addImportMap("dayjs", dayjs);
    app.mixin({
      async mounted() {
        if (!first) return;
        first = false;
        await import("promiseui-vue").then((promiseUI) => {
          addImportMap("promiseui-vue", promiseUI);
          app.use(promiseUI.default);
        });
      },
    });
  },
};

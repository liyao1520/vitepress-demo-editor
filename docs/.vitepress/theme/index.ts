import DefaultTheme from "vitepress/theme";
import { App } from "vue";
import { vuePlugin } from "../../../lib";

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.use(vuePlugin, {
      defaultDirection: "column",
      ms: 1000,
    });
    app.component("tag", {
      render() {
        return "i-tag";
      },
    });
  },
};

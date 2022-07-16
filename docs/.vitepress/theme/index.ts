import DefaultTheme from "vitepress/theme";
import { App } from "vue";
import { vuePlugin, addImportMap } from "../../../lib";
import dayjs from "dayjs";
export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.use(vuePlugin);
    addImportMap("dayjs", dayjs);
  },
};

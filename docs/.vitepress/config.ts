import { UserConfig } from "vitepress";
import markDownPlugin from "../../lib/markdownPlugin";

const config: UserConfig = {
  title: "VitePress",
  description: "Just playing around.",
  markdown: {
    config: (md) => {
      md.use(markDownPlugin);
    },
  },
};
export default config;

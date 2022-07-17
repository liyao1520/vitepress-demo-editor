import { UserConfig } from "vitepress";
// import markDownPlugin from "../../lib/markdownPlugin";
import markDownPlugin from "../../dist/markdownPlugin.cjs";

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

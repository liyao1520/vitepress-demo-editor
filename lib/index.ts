import * as Vue from "vue";

// 1. 获取vue,用来后续编译,渲染组件
// 2. 获取注册过的Components,可以在每个app实例共享复用它. 注:每个Demo都会创建一个新的app实例
import { setVue, setApp } from "./memo";
import { ConfigToken, Iconfig } from "./token";
export { addImportMap } from "./compiler/importMaps";

export const vuePlugin = function (app: Vue.App, config: Iconfig) {
  const Demo = Vue.defineAsyncComponent(() => import("./components/Demo.vue"));
  app.component("Demo", Demo);
  setVue(Vue);
  setApp(app);
  app.provide(
    ConfigToken,
    Object.assign({ ms: 300, defaultDirection: "row" as "row" }, config)
  );
};

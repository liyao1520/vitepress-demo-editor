import * as Vue from "vue";

// 1. 获取vue,用来后续编译,渲染组件
// 2. 获取注册过的Components,可以在每个app实例共享复用它. 注:每个Demo都会创建一个新的app实例
import { setVue, setApp } from "./memo";
import { onMonacoCreated } from "./monaco/initMonaco";
import { ConfigToken, IConfig } from "./token";

export { addImportMap } from "./compiler/importMaps";

export const vuePlugin = function (app: Vue.App, config: IConfig) {
  config = Object.assign({ ms: 300, defaultDirection: "row" as "row" }, config);

  const Demo = Vue.defineAsyncComponent(() => import("./components/Demo.vue"));
  app.component("Demo", Demo);
  app.config.errorHandler = function (err) {
    console.error(err);
  };
  setVue(
    Object.assign({}, Vue, {
      // 解决 jsx 在 { } 中写入 object 类型 导致的报错
      createVNode: enhanceCreateVnode(),
    })
  );
  setApp(app);

  app.provide(ConfigToken, config);

  onMonacoCreated(config.onMonacoCreated);
};

export const isObject = (target: unknown) =>
  typeof target == "object" && target !== null;

function enhanceCreateVnode() {
  return function (type: any, props: any, children: any, ...rest: any[]) {
    if (Array.isArray(children)) {
      children = children.map((vnode) => {
        if (Array.isArray(vnode)) {
          return vnode;
        }
        if (isObject(vnode) && !vnode.__v_isVNode) {
          return Vue.createTextVNode(String(vnode));
        }
        return vnode;
      });
    }
    const vnode = Vue.createVNode(type, props, children, ...rest);
    return vnode;
  };
}

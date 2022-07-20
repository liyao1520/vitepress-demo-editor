// 由于 vitepress 打包先在node上运行,所以要先把这些值缓存下来,到浏览器环境再使用

import { App } from "vue";

let vue = {}; // 当前 vue
let app = {}; // 当前实例
// export function setProvide() {
//   provide(ConfigToken, config);
// }

export function getVue() {
  return vue;
}
export function setVue(_vue: any) {
  vue = _vue;
}

export function setApp(_app: App) {
  app = _app;
}
export function getApp() {
  return app;
}
export function initialVue() {
  const w = window as any;
  if (w["_vue"]) return;
  w["_vue"] = vue;
  // Object.keys(vue).forEach((key) => {
  //   window["_vue"][key] = vue[key];
  // });
}

export function initialApp() {
  const w = window as any;
  if (w["_app"]) return;
  w["_app"] = app;
}

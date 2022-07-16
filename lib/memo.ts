// 由于 vitepress 打包先在node上运行,所以要先把这些值缓存下来,到浏览器环境再使用

let vue = {}; // 当前 vue
let app = {}; // 当前实例
// export function setProvide() {
//   provide(ConfigToken, config);
// }

export function getVue() {
  return vue;
}
export function setVue(_vue) {
  vue = _vue;
}

export function setApp(_app) {
  app = _app;
}
export function getApp() {
  return app;
}
export function initialVue() {
  if (window["_vue"]) return;
  window["_vue"] = vue;
  // Object.keys(vue).forEach((key) => {
  //   window["_vue"][key] = vue[key];
  // });
}

export function initialApp() {
  if (window["_app"]) return;
  window["_app"] = app;
}

import * as Vue from "vue";
let vue = {};
let app = {};
function setVue(_vue) {
  vue = _vue;
}
function setApp(_app) {
  app = _app;
}
function initialVue() {
  if (window["_vue"])
    return;
  window["_vue"] = vue;
}
function initialApp() {
  if (window["_app"])
    return;
  window["_app"] = app;
}
const ConfigToken = Symbol();
const importMaps = {};
function addImportMap(key, value) {
  importMaps[key] = value;
}
function handleImportMaps(script) {
  const _window = window;
  if (!_window.importMaps)
    _window.importMaps = importMaps;
  script = handleDefault(script);
  script = script.replace(/import(.*?)from\s+['"](.*?)['"]/g, (match, p1, p2) => {
    const key = p2;
    const value = importMaps[key];
    if (value) {
      if (!importMaps[`${key}`]) {
        importMaps[`${key}`] = value;
      }
      return `const ${p1} = importMaps['${p2}']`;
    } else {
      return match;
    }
  });
  return script;
}
function handleDefault(script) {
  return script.replace(/import(.*?)from\s+['"]vue['"]/g, (match, p1) => {
    p1 = p1.replace(/\sas\s/g, ":");
    return `const ${p1} = _vue`;
  });
}
const vuePlugin = function(app2, config) {
  const Demo = Vue.defineAsyncComponent(() => import("./Demo.js"));
  app2.component("Demo", Demo);
  setVue(Vue);
  setApp(app2);
  app2.provide(ConfigToken, Object.assign({ ms: 300, defaultDirection: "row" }, config));
};
export { ConfigToken as C, initialApp as a, addImportMap as b, handleImportMaps as h, initialVue as i, vuePlugin as v };

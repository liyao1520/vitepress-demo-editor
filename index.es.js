Object.defineProperty(exports, "__esModule", { value: true });
exports.vuePlugin = exports.addImportMap = void 0;
const tslib_1 = require("tslib");
const Vue = tslib_1.__importStar(require("vue"));
// 1. 获取vue,用来后续编译,渲染组件
// 2. 获取注册过的Components,可以在每个app实例共享复用它. 注:每个Demo都会创建一个新的app实例
const memo_1 = require("./memo");
const token_1 = require("./token");
var importMaps_1 = require("./compiler/importMaps");
Object.defineProperty(exports, "addImportMap", { enumerable: true, get: function () { return importMaps_1.addImportMap; } });
const vuePlugin = function (app, config) {
    const Demo = Vue.defineAsyncComponent(() => Promise.resolve().then(() => tslib_1.__importStar(require("./components/Demo.vue"))));
    app.component("Demo", Demo);
    (0, memo_1.setVue)(Vue);
    (0, memo_1.setApp)(app);
    app.provide(token_1.ConfigToken, Object.assign({ ms: 300, defaultDirection: "row" }, config));
};
exports.vuePlugin = vuePlugin;

# vitepress-demo-editor

## 介绍

一个 `vitepress` 文档插件,可以帮助你在编写文档的时候增加 `Vue` 示例,通常使用在组件库展示,支持在线编辑演示源代码且视图实时更新

### 支持

- 支持 vue sfc

- 支持 jsx/tsx

- 编辑器语法提示

- 编辑器代码高亮

## demo 预览

[promiseui](http://ui.coderly.top/components/button/) (一个 vue3 组件库)

## 安装

`npm install vitepress-demo-editor`

## 使用

**需要先安装两个插件**

### 1. 添加 vue 插件 和 样式文件

```js
// .vitepress/theme/index.js

import { vuePlugin } from "vitepress-demo-editor";
import "vitepress-demo-editor/dist/style.css";

export default {
  // ...otherConfig
  enhanceApp({ app }) {
    app.use(vuePlugin, {
      defaultDirection: "row", // 默认显示方向
      ms: 30, // 编辑器防抖时间
      handleError(errs) {}, // 错误信息
      onMonacoCreated(monaco) {}, // monaco 创建成功时触发
    });
  },
};
```

### 2. 添加 markdown 插件

```js
//.vitepress/config.js
import markdownPlugin from "vitepress-demo-editor/markdownPlugin";
const config = {
  // ...otherConfig
  markdown: {
    config: (md) => {
      md.use(markdownPlugin);
    },
  },
};
export default config;
```

### 在 markdown 中使用

### sfc

````md
:::demo

```vue
<template>
  <button class="demo-btn" @click="count--">-</button>
  <b class="demo-count" :class="{ red: count >= 3 }">{{ count }}</b>
  <button class="demo-btn" @click="count++">+</button>
</template>
<script setup>
import { ref } from "vue";
const count = ref(0);
const text = ref("");
</script>
<style>
/* 默认 scoped */
.demo-btn {
  padding: 0 10px;
  border: 1px solid #ccc;
}
.demo-count {
  display: inline-block;
  text-align: center;
  margin: 0 10px;
  min-width: 30px;
}
/* global */

:global(.red) {
  color: red;
}
</style>
```

:::
````

![演示](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6d7c98390c34792b61e6bd77c85074a~tplv-k3u1fbpfcp-watermark.image?)

设置`column`上下显示

````md
:::demo column

```vue
<!--  code -->
```

:::
````

设置 `height` 指定编辑器高度(有最小限制 column:200px row:300px)

指定高度 400

````md
:::demo height:400

```vue
<!--  code -->
```

:::
````

### jsx/tsx

#### 配置 vite.config.js

```js
// docs/vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  define: {
    "process.env.BABEL_TYPES_8_BREAKING": "false",
    "process.platform": '"darwin"',
    "Buffer.isBuffer": "undefined",
  },
  resolve: {
    alias: {
      assert: "browser-assert",
      path: "path-browserify",
    },
  },
});
```

#### 使用

#### jsx

````md
:::demo column

```jsx
<!--  code -->
```

:::
````

#### tsx

````md
:::demo column

```tsx
<!--  code -->
```

:::
````

#### Demo 预览

[promiseui-table-jsx](http://ui.coderly.top/components/table/#jsx-%E5%86%99%E6%B3%95)

## 打包报错?

打包可能会报错,提示 ` Error: Missing "./preload-helper" export in "vite" package` ,

原因不清楚,但有解决办法

`ctrl + click 进入报错文件`

![20220722220240](http://cdn.coderly.top/imgs/20220722220240.png)

搜索 `vite/preload-helper` 替换为 `\0vite/preload-helper`

![vite](http://cdn.coderly.top/imgs/vite.png)

`'vite/preload-helper'`->`'\0vite/preload-helper'`

![20220722220759](http://cdn.coderly.top/imgs/20220722220759.png)

## 高级用法

### importMap

#### 简单使用

默认只能`import vue`,要想`import` 其他库需要用`addImportMap`

```js
// .vitepress/theme/index.js
import { vuePlugin, addImportMap } from "vitepress-demo-editor";
import axios from "axios";

export default {
  // ...otherConfig
  enhanceApp({ app }) {
    app.use(vuePlugin);
    addImportMap("axios", axios);
  },
};
```

`然后在markdown中就可以使用`

````md
:::demo

```vue
<template>...</template>
<script setup>
// 使用
import axios from "axios";
</script>
```

:::
````

#### 对于 ssr 不友好的库

`由于 VitePress 应用程序在生成静态构建时在 Node.js 中进行服务器渲染，因此任何 Vue 使用都必须符合通用代码要求。简而言之，确保只在 beforeMount 或mounted 钩子中访问浏览器/DOM API。`

对于 `ssr` 不友好的库不能直接导入,否则打包会报错.以下代码可解决

```js
// .vitepress/theme/index.js
import { vuePlugin, addImportMap } from "vitepress-demo-editor";
let first = true;
export default {
  // ...otherConfig
  enhanceApp({ app }) {
    app.use(vuePlugin);
    app.mixin({
      async mounted() {
        if (!first) return;
        first = false;
        await import("vue-promiseui").then((promiseUI) => {
          addImportMap("promiseui-vue", promiseUI);
          app.use(promiseUI.default);
        });
      },
    });
  },
};
```

`由于异步 import 导致 addImportMap 执行时机可能会慢,在这前执行的代码会报错.所以要配置vite.config.ts optimizeDeps 预构建`

```js
export default defineConfig({
  optimizeDeps: {
    include: ["promiseui-vue"], //填入库名
  },
});
```

### 编辑器添加库提示

在`tsx` / `jsx` 中, 默认自带 `import` `vue` 有提示

![20220721184128](http://cdn.coderly.top/imgs/20220721184128.png)

如果想添加其他库代码提示 ,以`vue-promiseui`库为例子

```js
import { vuePlugin } from "vitepress-demo-editor";
import "vitepress-demo-editor/dist/style.css";
// 找到该库的类型文件,在vite中 以 ?raw方式导入
import promiseuiType from "promiseui-vue/dist/promiseui/vue-promiseui.d.ts?raw";

export default {
  // ...otherConfig
  enhanceApp({ app }) {
    app.use(vuePlugin, {
      onMonacoCreated(monaco) {
        // 在此处 添加库提示
        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          `
          declare module 'promiseui-vue' { 
            ${promiseuiType} 
          }
          `,
          "promiseui-vue"
        );
      }, //
    });
  },
};
```

### 黑暗模式

`html` 标签 `class` 有 `dark` 会自动变为黑暗模式

```html
<html class="dark">
  <!-- html -->
</html>
```

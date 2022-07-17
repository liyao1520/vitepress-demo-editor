# vitepress-demo-editor

## 介绍

一个 `vitepress` 文档插件,可以帮助你在编写文档的时候增加 `Vue` 示例,通常使用在组件库展示,支持在线编辑演示源代码且视图实时更新

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
      defaultDirection: "row", //default value
      ms: 30, // default value
      handleError(errs) {}, // 错误信息
    });
  },
};
```

### 2. 添加 markdown 插件

```js
//.vitepress/config.js
import markdownPlugin from "vitepress-demo-editor/dist/markdownPlugin.cjs";
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

````md
:::demo

```vue
<template>
  <button class="demo-btn" @click="count--">➖</button>
  <b class="demo-count" :class="{ red: count >= 3 }">{{ count }}</b>
  <button class="demo-btn" @click="count++">➕</button>
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

### 高级用法

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

#### 黑暗模式

`html` 标签 `class` 有 `dark` 会自动变为黑暗模式

```html
<html class="dark">
  <!-- html -->
</html>
```

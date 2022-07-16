# vitepress-demo-editor

## 安装

`npm install vitepress-demo-editor`

## 使用

### 添加 vue 插件

```js
// .vitepress/theme/index.js
export default {
  // ...otherConfig
  enhanceApp({ app }) {
    app.use(vuePlugin, {
      defaultDirection: "row", //default value
      ms: 30, // default value
    });
  },
};
```

### 添加 markdown 插件

```js
//.vitepress/config.js
const config = {
  // ...otherConfig
  markdown: {
    config: (md) => {
      md.use(markDownPlugin);
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

默认只能`import vue`,要想`import` 其他库需要用`add`

```js
// .vitepress/theme/index.js
import { vuePlugin, addImportMap } from "vitepress-demo-editor";
import dayjs from "dayjs";

export default {
  // ...otherConfig
  enhanceApp({ app }) {
    app.use(vuePlugin);
    addImportMap("dayjs", dayjs);
  },
};
```

`使用`

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

#### 黑暗模式

`html` 标签 `class` 有 `dark` 会自动变为黑暗模式

```html
<html class="dark">
  <!-- html -->
</html>
```

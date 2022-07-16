# demo

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

:::demo

```vue
<template>
  {{ day }}
</template>
<script setup>
import dayjs from "dayjs";
import { ref } from "vue";
const day = ref(dayjs());
</script>
```

:::

# AutoComplete 自动填充

## 基础用法

:::demo column

```vue
<template>
  <p-auto-complete
    v-model="inputValue"
    placeholder="请输入邮箱"
    :options="options"
  />
</template>
<script setup>
import { ref, computed } from "vue";
const inputValue = ref("");
const options = computed(() =>
  ["@gmail.com", "@163.com", "@qq.com"].map((suffix) => {
    const prefix = inputValue.value.split("@")[0];
    return {
      label: prefix + suffix,
      value: prefix + suffix,
    };
  })
);
</script>
```

:::

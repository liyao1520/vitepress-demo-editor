# demo

:::demo

```vue
<template>
  <button @click="count--">➖</button>
  <b>{{ count }}</b>
  <button @click="count++">➕</button>
</template>
<script setup>
import { ref } from "vue";
const count = ref(0);
const text = ref("");
</script>
```

:::

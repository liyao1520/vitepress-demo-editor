<template>
  <div
    class="demo"
    :style="{
      flexDirection: direction,
    }"
  >
    <div
      class="view-wrap"
      :style="{ borderRight: direction === 'column' ? '0' : undefined }"
    >
      <div class="view" :id="randomId" ref="viewRef"></div>
      <div class="error" v-if="errors.length">
        <div v-for="e in errors">{{ e.message }}</div>
        <div v-if="errors.length > 5">...</div>
      </div>
    </div>
    <div
      class="edit-wrap"
      @mouseenter="toolsShow = true"
      @mouseleave="toolsShow = false"
      :style="{ flex: direction === 'column' ? '0' : '4 0 40%' }"
    >
      <div class="tools" v-if="toolsShow && demoEditShow">
        <span title="重置代码" class="reset-code" @click="resetCode">
          <svg
            t="1652853672207"
            class="icon"
            viewBox="0 0 1130 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3224"
          >
            <path
              d="M1126.586009 306.125494l-204.026536 204.026536-204.026535-204.026536h148.939371a408.053071 408.053071 0 1 0 24.99325 357.046437h108.64413a511.953584 511.953584 0 1 1-20.402653-357.046437H1126.586009z"
              p-id="3225"
            ></path>
          </svg>
        </span>
        <span>可编辑</span>
      </div>
      <Edit
        class="edit"
        v-if="demoEditShow"
        :style="{
          height: editHeight + 'px',
          minHeight: direction === 'row' ? '200px' : '300px',
        }"
        :initial-value="$props.initialValue"
        :randomId="randomId"
        @change="handleChange"
        :language="$props.lang"
        ref="editRef"
      >
        <template #error v-if="errors.length">
          <div v-for="e in errors.slice(0, 4)">{{ e.message }}</div>
          <div v-if="errors.length > 4">...</div>
        </template>
      </Edit>
      <div
        v-if="direction === 'column' && demoEditShow"
        class="demo-control"
        @click="demoEditShow = false"
      >
        隐藏代码
        <svg
          t="1655722520234"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6572"
          width="14"
          height="14"
        >
          <path
            d="M946.33106 697.353498 541.30749 284.093337c-15.690354-16.009625-41.469484-16.009625-57.160861 0l-405.024593 413.260162c-24.819269 25.323758-6.877641 68.028373 28.579919 68.028373l810.048163 0C953.209724 765.381871 971.150328 722.677257 946.33106 697.353498z"
            p-id="6573"
          ></path>
        </svg>
      </div>
      <div
        v-if="direction === 'column' && !demoEditShow"
        class="demo-control"
        @click="demoEditShow = true"
      >
        展示代码
        <svg
          t="1655722463269"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6417"
          width="14"
          height="14"
        >
          <path
            d="M79.123059 327.850933l405.024593 413.260162c15.690354 16.009625 41.469484 16.009625 57.160861 0l405.02357-413.260162c24.819269-25.323758 6.877641-68.028373-28.579919-68.028373L107.704001 259.82256C72.245418 259.82256 54.30379 302.527175 79.123059 327.850933z"
            p-id="6418"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  ref,
  defineProps,
  onMounted,
  nextTick,
  inject,
  onUnmounted,
} from "vue";
import Compiler from "../compiler";
import { ConfigToken } from "../token";
import Edit from "./Edit.vue";

const { ms, defaultDirection, handleError } = inject(ConfigToken, {
  ms: 30,
  defaultDirection: "row",
});

const props = defineProps<{
  initialValue: string;
  direction?: "column" | "row";
  lang: "vue" | "jsx" | string;
  height?: string;
}>();

const isTypeScript = "tsx" === props.lang;

const direction = props.direction ? props.direction : defaultDirection;

const demoEditShow = ref(direction == "row");

const errors = ref<any[]>([]);
const editHeight = ref<number>(0);
const viewRef = ref<HTMLDivElement | null>(null);
const editRef = ref<any>(null);

const toolsShow = ref(false);

const randomId = "id_" + Math.random().toString(36).slice(2, 12);

const autoHeight = () => {
  const h = viewRef.value?.clientHeight || 0;
  const res = /\d+/.exec(props.height || "");
  const propsHeight = Number(res ? res[0] : 0);

  editHeight.value = Math.max(h, propsHeight);
};

const resetCode = () => {
  editRef.value?.reset();
};

let compiler: Compiler;
let observer: MutationObserver;
onMounted(async () => {
  const { default: Compiler } = await import("../compiler");

  await nextTick();
  compiler = new Compiler(`#${randomId}`, props.lang, isTypeScript, (errs) => {
    // 错误处理
    errors.value = errs;
    handleError?.(errs);
  });
  compiler.compileCode(props.initialValue);
  autoHeight();
  observer = new MutationObserver(autoHeight);
  if (viewRef.value) observer.observe(viewRef.value, { childList: true });
});
onUnmounted(() => {
  observer.disconnect();
});
const debounce = (fn: (...args: any[]) => any, wait: number) => {
  let timer: any;
  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
};
const compileCode = debounce(
  (content: string) => compiler.compileCode(content),
  ms
);
const handleChange = (content: string) => {
  if (!compiler) return;
  compileCode(content);
};
</script>

<style scoped>
.demo {
  margin-top: 10px;
  display: flex;
  border-radius: 4px;
  border: 1px solid #f2f2f3;
  padding: 5px;
  min-height: 200px;
  transition: 0.3s;
}
.demo:hover {
  box-shadow: 0 0 15px 4px rgb(0, 0, 0, 0.04);
}
@media (max-width: 720px) {
  .demo {
    flex-direction: column !important;
  }
}
.edit-wrap {
  position: relative;
  flex: 6 0 60%;
  height: 100%;
  overflow: hidden;
  border-radius: 4px;
}
.tools {
  display: flex;
  position: absolute;
  right: 18px;
  top: 0px;
  color: #000;
  z-index: 1;
  font-size: 12px;
  background-color: rgba(255, 255, 255, 0.6);
}
.reset-code {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
}
.reset-code:hover {
  background-color: #ccc;
}
.tools svg {
  width: 13px;
  height: 13px;
  cursor: pointer;
  line-height: 16px;
}

.view-wrap {
  position: relative;
  flex: 4 0 40%;
  min-height: 100px;
  padding: 5px;
  display: flex;
  border-right: 1px solid var(--c-divider, rgb(240, 235, 235));
}
.view {
  width: 100%;
  height: 100%;
}
.error {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #a12027;
  color: #fff;
  z-index: 1;
  padding: 15px;
  opacity: 0.86;
  font-size: 12px;
  white-space: pre;
  overflow: auto;
}
.error > div {
  margin: 5px 0;
}
.demo-control {
  position: relative;
  padding: 10px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  z-index: 1;
}
.demo-control svg {
  display: inline;
  fill: currentColor;
}
</style>

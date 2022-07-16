<script lang="ts" setup>
import { onMounted, ref, defineExpose } from "vue";
import initMonaco from "../monaco/initMonaco";
import iDark from "../theme/dark.json";
const props = defineProps({
  initialValue: {
    type: String,
    default: "",
  },
  theme: {
    type: String,
    default: "vs",
  },
  language: {
    type: String,
    default: "html",
  },
});
const emit = defineEmits(["change"]);
const monacoContainer = ref<HTMLDivElement | null>(null);
let monacoInstance: any;
onMounted(async () => {
  const monaco = await initMonaco();

  const isDark = document.documentElement.classList.contains("dark");

  if (!(window as any).monaco) {
    (window as any).monaco = monaco;
  }
  if (!monacoContainer.value) return;

  monaco.editor.defineTheme("iDark", iDark as any);
  monacoInstance = monaco.editor.create(monacoContainer.value, {
    theme: isDark ? "iDark" : "vs",
    value: props.initialValue,
    language: props.language,
    automaticLayout: true,
    tabSize: 2,
    minimap: { enabled: false },
    lineNumbers: "off",
    scrollbar: {
      handleMouseWheel: false,
    },
  });

  monacoInstance.onDidChangeModelContent((e: any) => {
    const newValue = monacoInstance.getValue();
    emit("change", newValue);
  });
  monacoInstance.onDidBlurEditorText(() => {
    monacoInstance.updateOptions({
      scrollbar: {
        handleMouseWheel: false,
      },
    });
  });
  monacoInstance.onDidFocusEditorText(() => {
    monacoInstance.updateOptions({
      scrollbar: {
        handleMouseWheel: true,
      },
    });
  });

  // 黑暗模式设配
  const observer = new MutationObserver((entries) => {
    entries.forEach((mutation) => {
      const target = mutation.target as HTMLHtmlElement;

      if (target.classList.contains("dark")) {
        monacoInstance.updateOptions({
          theme: "iDark",
        });
      } else {
        monacoInstance.updateOptions({ theme: "vs" });
      }
    });
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
});
defineExpose({
  reset() {
    monacoInstance.setValue(props.initialValue);
  },
});
</script>

<template>
  <div class="monaco" ref="monacoContainer"></div>
</template>
<style scoped>
.monaco {
  position: relative;
}
.error {
  position: absolute;
  bottom: 2px;
  right: 18px;
  color: red;
  z-index: 999;
  font-size: 12px;
}
</style>

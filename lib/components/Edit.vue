<script lang="ts" setup>
import { onMounted, ref, defineExpose } from "vue";
import iDark from "../theme/dark.json";
import iLight from "../theme/light.json";
import initMonaco from "../monaco/initMonaco";
import { getRandomId } from "../utils";
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
  monaco.editor.defineTheme("iLight", iLight as any);

  let extension = "html";
  let language = "html";
  if (["jsx", "tsx"].includes(props.language)) {
    extension = "tsx";
    language = "typescript";
  }

  monacoInstance = monaco.editor.create(monacoContainer.value, {
    theme: isDark ? "iDark" : "iLight",
    automaticLayout: true,
    tabSize: 2,
    fixedOverflowWidgets: true,
    minimap: { enabled: false },
    // lineNumbers: "off",
    scrollbar: {
      handleMouseWheel: false,
    },
    fontSize: 14,
  });
  // 创建模型 文件名不能相同
  // 随机名字即可, fix : #5
  const modelUri = monaco.Uri.file(`${getRandomId()}.${extension}`);
  const codeModel = monaco.editor.createModel(
    props.initialValue,
    language,
    modelUri // Pass the file name to the model here.
  );
  monacoInstance.setModel(codeModel);

  //---
  monacoInstance.onDidChangeModelContent((e: any) => {
    const newValue = monacoInstance.getValue();
    emit("change", newValue);
  });

  // --- 防止浏览器滚动时,鼠标移动到编辑器上停止滚动,而去滚动编辑器的行为
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
  // ---
  // --- 黑暗模式设配
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

<script lang="ts" setup>
import { onMounted, ref, defineExpose } from "vue";
import iDark from "../theme/dark.json";
import iLight from "../theme/light.json";

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
  const [monaco] = await Promise.all([
    import("monaco-editor/esm/vs/editor/editor.api"),
    import(
      "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution"
    ),
    import(
      "monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution"
    ),
    import("monaco-editor/esm/vs/basic-languages/html/html.contribution"),
    import("monaco-editor/esm/vs/basic-languages/css/css.contribution"),
  ]);

  const isDark = document.documentElement.classList.contains("dark");
  if (!(window as any).monaco) {
    (window as any).monaco = monaco;
  }
  if (!monacoContainer.value) return;

  monaco.editor.defineTheme("iDark", iDark as any);
  monaco.editor.defineTheme("iLight", iLight as any);

  const language = ["jsx", "js", "ts", "tsx"].includes(props.language)
    ? "typescript"
    : "html";

  monacoInstance = monaco.editor.create(monacoContainer.value, {
    theme: isDark ? "iDark" : "iLight",
    value: props.initialValue,
    language: language,
    automaticLayout: true,
    tabSize: 2,
    minimap: { enabled: false },
    lineNumbers: "off",
    scrollbar: {
      handleMouseWheel: false,
    },
    fontSize: 14,
  });

  const [{ default: MonacoJSXHighlighter, JSXTypes }, { parse }, traverse] =
    await Promise.all([
      import("monaco-jsx-highlighter"),
      import("@babel/parser"),
      import("@babel/traverse"),
    ]);
  // 高亮代码
  function changeHighlighterClass(key: string, value: string) {
    JSXTypes[key].options.inlineClassName = value;
  }
  changeHighlighterClass("JSXBracket", "mtk1");
  changeHighlighterClass("JSXIdentifier", "mtk6");
  changeHighlighterClass("JSXText", "mtk1");
  changeHighlighterClass("JSXExpressionContainer", "mtk1");
  const monacoJSXHighlighter = new MonacoJSXHighlighter(
    monaco,
    parse,
    traverse,
    monacoInstance
  );
  // 防抖
  monacoJSXHighlighter.highlightOnDidChangeModelContent(100);

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

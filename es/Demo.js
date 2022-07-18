import { defineComponent, ref, onMounted, openBlock, createElementBlock, inject, nextTick, normalizeStyle, unref, createElementVNode, Fragment, renderList, toDisplayString, createCommentVNode, createBlock, createSlots, withCtx, pushScopeId, popScopeId, createTextVNode } from "vue";
import { C as ConfigToken } from "./index2.js";
const base = "vs-dark";
const inherit = true;
const rules = [
  {
    foreground: "637777",
    token: "comment"
  },
  {
    foreground: "addb67",
    token: "string"
  },
  {
    foreground: "ecc48d",
    token: "vstring.quoted"
  },
  {
    foreground: "ecc48d",
    token: "variable.other.readwrite.js"
  },
  {
    foreground: "5ca7e4",
    token: "string.regexp"
  },
  {
    foreground: "5ca7e4",
    token: "string.regexp keyword.other"
  },
  {
    foreground: "5f7e97",
    token: "meta.function punctuation.separator.comma"
  },
  {
    foreground: "f78c6c",
    token: "constant.numeric"
  },
  {
    foreground: "f78c6c",
    token: "constant.character.numeric"
  },
  {
    foreground: "addb67",
    token: "variable"
  },
  {
    foreground: "c792ea",
    token: "keyword"
  },
  {
    foreground: "c792ea",
    token: "punctuation.accessor"
  },
  {
    foreground: "c792ea",
    token: "storage"
  },
  {
    foreground: "c792ea",
    token: "meta.var.expr"
  },
  {
    foreground: "c792ea",
    token: "meta.class meta.method.declaration meta.var.expr storage.type.jsm"
  },
  {
    foreground: "c792ea",
    token: "storage.type.property.js"
  },
  {
    foreground: "c792ea",
    token: "storage.type.property.ts"
  },
  {
    foreground: "c792ea",
    token: "storage.type.property.tsx"
  },
  {
    foreground: "82aaff",
    token: "storage.type"
  },
  {
    foreground: "ffcb8b",
    token: "entity.name.class"
  },
  {
    foreground: "ffcb8b",
    token: "meta.class entity.name.type.class"
  },
  {
    foreground: "addb67",
    token: "entity.other.inherited-class"
  },
  {
    foreground: "82aaff",
    token: "entity.name.function"
  },
  {
    foreground: "addb67",
    token: "punctuation.definition.variable"
  },
  {
    foreground: "d3423e",
    token: "punctuation.section.embedded"
  },
  {
    foreground: "d6deeb",
    token: "punctuation.terminator.expression"
  },
  {
    foreground: "d6deeb",
    token: "punctuation.definition.arguments"
  },
  {
    foreground: "d6deeb",
    token: "punctuation.definition.array"
  },
  {
    foreground: "d6deeb",
    token: "punctuation.section.array"
  },
  {
    foreground: "d6deeb",
    token: "meta.array"
  },
  {
    foreground: "d9f5dd",
    token: "punctuation.definition.list.begin"
  },
  {
    foreground: "d9f5dd",
    token: "punctuation.definition.list.end"
  },
  {
    foreground: "d9f5dd",
    token: "punctuation.separator.arguments"
  },
  {
    foreground: "d9f5dd",
    token: "punctuation.definition.list"
  },
  {
    foreground: "d3423e",
    token: "string.template meta.template.expression"
  },
  {
    foreground: "d6deeb",
    token: "string.template punctuation.definition.string"
  },
  {
    foreground: "c792ea",
    fontStyle: "italic",
    token: "italic"
  },
  {
    foreground: "addb67",
    fontStyle: "bold",
    token: "bold"
  },
  {
    foreground: "82aaff",
    token: "constant.language"
  },
  {
    foreground: "82aaff",
    token: "punctuation.definition.constant"
  },
  {
    foreground: "82aaff",
    token: "variable.other.constant"
  },
  {
    foreground: "7fdbca",
    token: "support.function.construct"
  },
  {
    foreground: "7fdbca",
    token: "keyword.other.new"
  },
  {
    foreground: "82aaff",
    token: "constant.character"
  },
  {
    foreground: "82aaff",
    token: "constant.other"
  },
  {
    foreground: "f78c6c",
    token: "constant.character.escape"
  },
  {
    foreground: "addb67",
    token: "entity.other.inherited-class"
  },
  {
    foreground: "d7dbe0",
    token: "variable.parameter"
  },
  {
    foreground: "7fdbca",
    token: "entity.name.tag"
  },
  {
    foreground: "cc2996",
    token: "punctuation.definition.tag.html"
  },
  {
    foreground: "cc2996",
    token: "punctuation.definition.tag.begin"
  },
  {
    foreground: "cc2996",
    token: "punctuation.definition.tag.end"
  },
  {
    foreground: "addb67",
    token: "entity.other.attribute-name"
  },
  {
    foreground: "addb67",
    token: "entity.name.tag.custom"
  },
  {
    foreground: "82aaff",
    token: "support.function"
  },
  {
    foreground: "82aaff",
    token: "support.constant"
  },
  {
    foreground: "7fdbca",
    token: "upport.constant.meta.property-value"
  },
  {
    foreground: "addb67",
    token: "support.type"
  },
  {
    foreground: "addb67",
    token: "support.class"
  },
  {
    foreground: "addb67",
    token: "support.variable.dom"
  },
  {
    foreground: "7fdbca",
    token: "support.constant"
  },
  {
    foreground: "7fdbca",
    token: "keyword.other.special-method"
  },
  {
    foreground: "7fdbca",
    token: "keyword.other.new"
  },
  {
    foreground: "7fdbca",
    token: "keyword.other.debugger"
  },
  {
    foreground: "7fdbca",
    token: "keyword.control"
  },
  {
    foreground: "c792ea",
    token: "keyword.operator.comparison"
  },
  {
    foreground: "c792ea",
    token: "keyword.control.flow.js"
  },
  {
    foreground: "c792ea",
    token: "keyword.control.flow.ts"
  },
  {
    foreground: "c792ea",
    token: "keyword.control.flow.tsx"
  },
  {
    foreground: "c792ea",
    token: "keyword.control.ruby"
  },
  {
    foreground: "c792ea",
    token: "keyword.control.module.ruby"
  },
  {
    foreground: "c792ea",
    token: "keyword.control.class.ruby"
  },
  {
    foreground: "c792ea",
    token: "keyword.control.def.ruby"
  },
  {
    foreground: "c792ea",
    token: "keyword.control.loop.js"
  },
  {
    foreground: "c792ea",
    token: "keyword.control.loop.ts"
  },
  {
    foreground: "c792ea",
    token: "keyword.control.import.js"
  },
  {
    foreground: "c792ea",
    token: "keyword.control.import.ts"
  },
  {
    foreground: "c792ea",
    token: "keyword.control.import.tsx"
  },
  {
    foreground: "c792ea",
    token: "keyword.control.from.js"
  },
  {
    foreground: "c792ea",
    token: "keyword.control.from.ts"
  },
  {
    foreground: "c792ea",
    token: "keyword.control.from.tsx"
  },
  {
    foreground: "ffffff",
    background: "ff2c83",
    token: "invalid"
  },
  {
    foreground: "ffffff",
    background: "d3423e",
    token: "invalid.deprecated"
  },
  {
    foreground: "7fdbca",
    token: "keyword.operator"
  },
  {
    foreground: "c792ea",
    token: "keyword.operator.relational"
  },
  {
    foreground: "c792ea",
    token: "keyword.operator.assignement"
  },
  {
    foreground: "c792ea",
    token: "keyword.operator.arithmetic"
  },
  {
    foreground: "c792ea",
    token: "keyword.operator.bitwise"
  },
  {
    foreground: "c792ea",
    token: "keyword.operator.increment"
  },
  {
    foreground: "c792ea",
    token: "keyword.operator.ternary"
  },
  {
    foreground: "637777",
    token: "comment.line.double-slash"
  },
  {
    foreground: "cdebf7",
    token: "object"
  },
  {
    foreground: "ff5874",
    token: "constant.language.null"
  },
  {
    foreground: "d6deeb",
    token: "meta.brace"
  },
  {
    foreground: "c792ea",
    token: "meta.delimiter.period"
  },
  {
    foreground: "d9f5dd",
    token: "punctuation.definition.string"
  },
  {
    foreground: "ff5874",
    token: "constant.language.boolean"
  },
  {
    foreground: "ffffff",
    token: "object.comma"
  },
  {
    foreground: "7fdbca",
    token: "variable.parameter.function"
  },
  {
    foreground: "80cbc4",
    token: "support.type.vendor.property-name"
  },
  {
    foreground: "80cbc4",
    token: "support.constant.vendor.property-value"
  },
  {
    foreground: "80cbc4",
    token: "support.type.property-name"
  },
  {
    foreground: "80cbc4",
    token: "meta.property-list entity.name.tag"
  },
  {
    foreground: "57eaf1",
    token: "meta.property-list entity.name.tag.reference"
  },
  {
    foreground: "f78c6c",
    token: "constant.other.color.rgb-value punctuation.definition.constant"
  },
  {
    foreground: "ffeb95",
    token: "constant.other.color"
  },
  {
    foreground: "ffeb95",
    token: "keyword.other.unit"
  },
  {
    foreground: "c792ea",
    token: "meta.selector"
  },
  {
    foreground: "fad430",
    token: "entity.other.attribute-name.id"
  },
  {
    foreground: "80cbc4",
    token: "meta.property-name"
  },
  {
    foreground: "c792ea",
    token: "entity.name.tag.doctype"
  },
  {
    foreground: "c792ea",
    token: "meta.tag.sgml.doctype"
  },
  {
    foreground: "d9f5dd",
    token: "punctuation.definition.parameters"
  },
  {
    foreground: "ecc48d",
    token: "string.quoted"
  },
  {
    foreground: "ecc48d",
    token: "string.quoted.double"
  },
  {
    foreground: "ecc48d",
    token: "string.quoted.single"
  },
  {
    foreground: "addb67",
    token: "support.constant.math"
  },
  {
    foreground: "addb67",
    token: "support.type.property-name.json"
  },
  {
    foreground: "addb67",
    token: "support.constant.json"
  },
  {
    foreground: "c789d6",
    token: "meta.structure.dictionary.value.json string.quoted.double"
  },
  {
    foreground: "80cbc4",
    token: "string.quoted.double.json punctuation.definition.string.json"
  },
  {
    foreground: "ff5874",
    token: "meta.structure.dictionary.json meta.structure.dictionary.value constant.language"
  },
  {
    foreground: "d6deeb",
    token: "variable.other.ruby"
  },
  {
    foreground: "ecc48d",
    token: "entity.name.type.class.ruby"
  },
  {
    foreground: "ecc48d",
    token: "keyword.control.class.ruby"
  },
  {
    foreground: "ecc48d",
    token: "meta.class.ruby"
  },
  {
    foreground: "7fdbca",
    token: "constant.language.symbol.hashkey.ruby"
  },
  {
    foreground: "e0eddd",
    background: "a57706",
    fontStyle: "italic",
    token: "meta.diff"
  },
  {
    foreground: "e0eddd",
    background: "a57706",
    fontStyle: "italic",
    token: "meta.diff.header"
  },
  {
    foreground: "ef535090",
    fontStyle: "italic",
    token: "markup.deleted"
  },
  {
    foreground: "a2bffc",
    fontStyle: "italic",
    token: "markup.changed"
  },
  {
    foreground: "a2bffc",
    fontStyle: "italic",
    token: "meta.diff.header.git"
  },
  {
    foreground: "a2bffc",
    fontStyle: "italic",
    token: "meta.diff.header.from-file"
  },
  {
    foreground: "a2bffc",
    fontStyle: "italic",
    token: "meta.diff.header.to-file"
  },
  {
    foreground: "219186",
    background: "eae3ca",
    token: "markup.inserted"
  },
  {
    foreground: "d3201f",
    token: "other.package.exclude"
  },
  {
    foreground: "d3201f",
    token: "other.remove"
  },
  {
    foreground: "269186",
    token: "other.add"
  },
  {
    foreground: "ff5874",
    token: "constant.language.python"
  },
  {
    foreground: "82aaff",
    token: "variable.parameter.function.python"
  },
  {
    foreground: "82aaff",
    token: "meta.function-call.arguments.python"
  },
  {
    foreground: "b2ccd6",
    token: "meta.function-call.python"
  },
  {
    foreground: "b2ccd6",
    token: "meta.function-call.generic.python"
  },
  {
    foreground: "d6deeb",
    token: "punctuation.python"
  },
  {
    foreground: "addb67",
    token: "entity.name.function.decorator.python"
  },
  {
    foreground: "8eace3",
    token: "source.python variable.language.special"
  },
  {
    foreground: "82b1ff",
    token: "markup.heading.markdown"
  },
  {
    foreground: "c792ea",
    fontStyle: "italic",
    token: "markup.italic.markdown"
  },
  {
    foreground: "addb67",
    fontStyle: "bold",
    token: "markup.bold.markdown"
  },
  {
    foreground: "697098",
    token: "markup.quote.markdown"
  },
  {
    foreground: "80cbc4",
    token: "markup.inline.raw.markdown"
  },
  {
    foreground: "ff869a",
    token: "markup.underline.link.markdown"
  },
  {
    foreground: "ff869a",
    token: "markup.underline.link.image.markdown"
  },
  {
    foreground: "d6deeb",
    token: "string.other.link.title.markdown"
  },
  {
    foreground: "d6deeb",
    token: "string.other.link.description.markdown"
  },
  {
    foreground: "82b1ff",
    token: "punctuation.definition.string.markdown"
  },
  {
    foreground: "82b1ff",
    token: "punctuation.definition.string.begin.markdown"
  },
  {
    foreground: "82b1ff",
    token: "punctuation.definition.string.end.markdown"
  },
  {
    foreground: "82b1ff",
    token: "meta.link.inline.markdown punctuation.definition.string"
  },
  {
    foreground: "7fdbca",
    token: "punctuation.definition.metadata.markdown"
  },
  {
    foreground: "82b1ff",
    token: "beginning.punctuation.definition.list.markdown"
  }
];
const colors = {
  "editor.foreground": "#d6deeb",
  "editor.background": "#18181c",
  "editor.selectionBackground": "#5f7e9779",
  "editor.lineHighlightBackground": "#010E17",
  "editorCursor.foreground": "#80a4c2",
  "editorWhitespace.foreground": "#2e2040",
  "editorIndentGuide.background": "#5e81ce52",
  "editor.selectionHighlightBorder": "#122d42"
};
var iDark = {
  base,
  inherit,
  rules,
  colors
};
var Edit_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Edit",
  props: {
    initialValue: {
      type: String,
      default: ""
    },
    theme: {
      type: String,
      default: "vs"
    },
    language: {
      type: String,
      default: "html"
    }
  },
  emits: ["change"],
  setup(__props, { expose, emit }) {
    const props = __props;
    const monacoContainer = ref(null);
    let monacoInstance;
    onMounted(async () => {
      const [monaco] = await Promise.all([
        import("./editor.api.js").then(function(n) {
          return n.m;
        }),
        import("./javascript.contribution.js"),
        import("./html.contribution.js"),
        import("./css.contribution.js")
      ]);
      const isDark = document.documentElement.classList.contains("dark");
      if (!window.monaco) {
        window.monaco = monaco;
      }
      if (!monacoContainer.value)
        return;
      monaco.editor.defineTheme("iDark", iDark);
      monacoInstance = monaco.editor.create(monacoContainer.value, {
        theme: isDark ? "iDark" : "vs",
        value: props.initialValue,
        language: props.language,
        automaticLayout: true,
        tabSize: 2,
        minimap: { enabled: false },
        lineNumbers: "off",
        scrollbar: {
          handleMouseWheel: false
        },
        fontSize: 14
      });
      monacoInstance.onDidChangeModelContent((e) => {
        const newValue = monacoInstance.getValue();
        emit("change", newValue);
      });
      monacoInstance.onDidBlurEditorText(() => {
        monacoInstance.updateOptions({
          scrollbar: {
            handleMouseWheel: false
          }
        });
      });
      monacoInstance.onDidFocusEditorText(() => {
        monacoInstance.updateOptions({
          scrollbar: {
            handleMouseWheel: true
          }
        });
      });
      const observer = new MutationObserver((entries) => {
        entries.forEach((mutation) => {
          const target = mutation.target;
          if (target.classList.contains("dark")) {
            monacoInstance.updateOptions({
              theme: "iDark"
            });
          } else {
            monacoInstance.updateOptions({ theme: "vs" });
          }
        });
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"]
      });
    });
    expose({
      reset() {
        monacoInstance.setValue(props.initialValue);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "monaco",
        ref_key: "monacoContainer",
        ref: monacoContainer
      }, null, 512);
    };
  }
});
var Edit = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-66ec4f5b"], ["__file", "E:/project/vitepress-demo-editor/lib/components/Edit.vue"]]);
var Demo_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-3a7e4ab4"), n = n(), popScopeId(), n);
const _hoisted_1 = ["id"];
const _hoisted_2 = {
  key: 0,
  class: "error"
};
const _hoisted_3 = { key: 0 };
const _hoisted_4 = {
  key: 0,
  class: "tools"
};
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("svg", {
  t: "1652853672207",
  class: "icon",
  viewBox: "0 0 1130 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "3224"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    d: "M1126.586009 306.125494l-204.026536 204.026536-204.026535-204.026536h148.939371a408.053071 408.053071 0 1 0 24.99325 357.046437h108.64413a511.953584 511.953584 0 1 1-20.402653-357.046437H1126.586009z",
    "p-id": "3225"
  })
], -1));
const _hoisted_6 = [
  _hoisted_5
];
const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("span", null, "\u53EF\u7F16\u8F91", -1));
const _hoisted_8 = { key: 0 };
const _hoisted_9 = /* @__PURE__ */ createTextVNode(" \u9690\u85CF\u4EE3\u7801 ");
const _hoisted_10 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("svg", {
  t: "1655722520234",
  class: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "6572",
  width: "14",
  height: "14"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    d: "M946.33106 697.353498 541.30749 284.093337c-15.690354-16.009625-41.469484-16.009625-57.160861 0l-405.024593 413.260162c-24.819269 25.323758-6.877641 68.028373 28.579919 68.028373l810.048163 0C953.209724 765.381871 971.150328 722.677257 946.33106 697.353498z",
    "p-id": "6573"
  })
], -1));
const _hoisted_11 = [
  _hoisted_9,
  _hoisted_10
];
const _hoisted_12 = /* @__PURE__ */ createTextVNode(" \u5C55\u793A\u4EE3\u7801 ");
const _hoisted_13 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("svg", {
  t: "1655722463269",
  class: "icon",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "6417",
  width: "14",
  height: "14"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    d: "M79.123059 327.850933l405.024593 413.260162c15.690354 16.009625 41.469484 16.009625 57.160861 0l405.02357-413.260162c24.819269-25.323758 6.877641-68.028373-28.579919-68.028373L107.704001 259.82256C72.245418 259.82256 54.30379 302.527175 79.123059 327.850933z",
    "p-id": "6418"
  })
], -1));
const _hoisted_14 = [
  _hoisted_12,
  _hoisted_13
];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Demo",
  props: {
    initialValue: { type: String, required: true },
    direction: { type: String, required: false }
  },
  setup(__props) {
    const props = __props;
    const { ms, defaultDirection, handleError } = inject(ConfigToken, {
      ms: 30,
      defaultDirection: "row"
    });
    const direction = props.direction ? props.direction : defaultDirection;
    const demoEditShow = ref(direction == "row");
    const errors = ref([]);
    const editHeight = ref(0);
    const viewRef = ref(null);
    const editRef = ref(null);
    const randomId = ref("");
    const toolsShow = ref(false);
    const autoHeight = () => {
      var _a;
      const h = ((_a = viewRef.value) == null ? void 0 : _a.clientHeight) || 0;
      editHeight.value = h > 200 ? h : 200;
    };
    const resetCode = () => {
      var _a;
      (_a = editRef.value) == null ? void 0 : _a.reset();
    };
    let compiler;
    onMounted(async () => {
      const { default: Compiler2 } = await import("./index3.js");
      randomId.value = "id_" + Math.random().toString(36).slice(2, 12);
      await nextTick();
      compiler = new Compiler2(`#${randomId.value}`, (errs) => {
        errors.value = errs;
        handleError == null ? void 0 : handleError(errs);
      });
      compiler.compileCode(props.initialValue);
      autoHeight();
      let obsever = new MutationObserver(autoHeight);
      if (viewRef.value)
        obsever.observe(viewRef.value, { childList: true });
    });
    const debounce = (fn, wait) => {
      let timer;
      return (...args) => {
        if (timer)
          clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(this, args);
        }, wait);
      };
    };
    const compileCode = debounce((content) => compiler.compileCode(content), ms);
    const handleChange = (content) => {
      if (!compiler)
        return;
      compileCode(content);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "demo",
        style: normalizeStyle({
          flexDirection: unref(direction)
        })
      }, [
        createElementVNode("div", {
          class: "view-wrap",
          style: normalizeStyle({ borderRight: unref(direction) === "column" ? "0" : void 0 })
        }, [
          createElementVNode("div", {
            class: "view",
            id: randomId.value,
            ref_key: "viewRef",
            ref: viewRef
          }, null, 8, _hoisted_1),
          errors.value.length ? (openBlock(), createElementBlock("div", _hoisted_2, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(errors.value.slice(0, 5), (e) => {
              return openBlock(), createElementBlock("div", null, toDisplayString(e.message), 1);
            }), 256)),
            errors.value.length > 5 ? (openBlock(), createElementBlock("div", _hoisted_3, "...")) : createCommentVNode("v-if", true)
          ])) : createCommentVNode("v-if", true)
        ], 4),
        createElementVNode("div", {
          class: "edit-wrap",
          onMouseenter: _cache[2] || (_cache[2] = ($event) => toolsShow.value = true),
          onMouseleave: _cache[3] || (_cache[3] = ($event) => toolsShow.value = false),
          style: normalizeStyle({ flex: unref(direction) === "column" ? "0" : "4 0 40%" })
        }, [
          toolsShow.value && demoEditShow.value ? (openBlock(), createElementBlock("div", _hoisted_4, [
            createElementVNode("span", {
              title: "\u91CD\u7F6E\u4EE3\u7801",
              class: "reset-code",
              onClick: resetCode
            }, _hoisted_6),
            _hoisted_7
          ])) : createCommentVNode("v-if", true),
          demoEditShow.value ? (openBlock(), createBlock(Edit, {
            key: 1,
            class: "edit",
            style: normalizeStyle({
              height: editHeight.value + "px",
              minHeight: unref(direction) === "row" ? "200px" : "300px"
            }),
            "initial-value": _ctx.$props.initialValue,
            onChange: handleChange,
            ref_key: "editRef",
            ref: editRef
          }, createSlots({ _: 2 }, [
            errors.value.length ? {
              name: "error",
              fn: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(errors.value.slice(0, 4), (e) => {
                  return openBlock(), createElementBlock("div", null, toDisplayString(e.message), 1);
                }), 256)),
                errors.value.length > 4 ? (openBlock(), createElementBlock("div", _hoisted_8, "...")) : createCommentVNode("v-if", true)
              ])
            } : void 0
          ]), 1032, ["style", "initial-value"])) : createCommentVNode("v-if", true),
          unref(direction) === "column" && demoEditShow.value ? (openBlock(), createElementBlock("div", {
            key: 2,
            class: "demo-control",
            onClick: _cache[0] || (_cache[0] = ($event) => demoEditShow.value = false)
          }, _hoisted_11)) : createCommentVNode("v-if", true),
          unref(direction) === "column" && !demoEditShow.value ? (openBlock(), createElementBlock("div", {
            key: 3,
            class: "demo-control",
            onClick: _cache[1] || (_cache[1] = ($event) => demoEditShow.value = true)
          }, _hoisted_14)) : createCommentVNode("v-if", true)
        ], 36)
      ], 4);
    };
  }
});
var Demo = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3a7e4ab4"], ["__file", "E:/project/vitepress-demo-editor/lib/components/Demo.vue"]]);
export { Demo as default };

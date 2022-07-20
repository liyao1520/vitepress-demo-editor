/* __imports__ */

import vueTypes from "@vue/runtime-core/dist/runtime-core.d.ts?raw";
import jsx from "./jsx.text?raw";
export default async function init() {
  const [monaco] = await Promise.all([
    import("monaco-editor"),
    import(
      "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution"
    ),
    import(
      "monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution"
    ),
    import("monaco-editor/esm/vs/basic-languages/html/html.contribution"),
    import("monaco-editor/esm/vs/basic-languages/css/css.contribution"),
  ]);

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    esModuleInterop: true,
    jsx: monaco.languages.typescript.JsxEmit.React,
    reactNamespace: "React",
    allowJs: true,
    typeRoots: ["node_modules/@types"],
  });

  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });

  monaco.languages.typescript.typescriptDefaults.addExtraLib(jsx, `jsx`);
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `
  declare module 'vue' { ${vueTypes} }
`,
    "ts:vue"
  );
  await Promise.all([
    // load workers
    (async () => {
      const [
        { default: EditorWorker },
        { default: HtmlWorker },
        { default: TsWorker },
      ] = await Promise.all([
        import("monaco-editor/esm/vs/editor/editor.worker?worker"),
        import("monaco-editor/esm/vs/language/html/html.worker?worker"),
        import("monaco-editor/esm/vs/language/typescript/ts.worker?worker"),
      ]);

      // @ts-expect-error
      window.MonacoEnvironment = {
        getWorker(_: any, label: string) {
          if (label === "html" || label === "handlebars" || label === "razor")
            return new HtmlWorker();
          if (label === "typescript" || label === "javascript")
            return new TsWorker();
          return new EditorWorker();
        },
      };
    })(),
  ]);
  return monaco;
}

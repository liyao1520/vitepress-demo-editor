import { templateWrap } from "./templateWrap";
import { initialGlobalVariable } from "../memo";
import { handleImportMaps } from "./importMaps";
import * as compiler from "vue/compiler-sfc";

type ErrorFn = (errors: (compiler.CompilerError | SyntaxError)[]) => void;
let g_id = 0;

initialGlobalVariable();

const langs = ["jsx", "vue", "tsx"] as const;
type Lang = typeof langs[number];
export default class Compiler {
  private selector: string;
  private scriptEl: HTMLScriptElement | null = null;
  private templateUrl = "";
  private scriptUrl = "";
  private _id = g_id;
  private styleEl = document.createElement("style");
  private onError: ErrorFn = () => {};
  private lang: Lang;
  private isTypeScript = false;
  constructor(
    selector: string,
    lang: string,
    isTypeScript = false,
    onError?: ErrorFn
  ) {
    this.selector = selector;
    this.lang = langs.includes(lang as Lang) ? (lang as Lang) : "vue";
    this.isTypeScript = isTypeScript;
    if (onError) {
      this.onError = onError;
    }
    // 把 onError 放到全局上
    this.handleRunTimeError();
    document.body.appendChild(this.styleEl);
    // 全局id++,避免重名
    g_id++;
  }
  listenError() {
    window.addEventListener("error", (e) => {
      const isSelfError = [this.scriptUrl, this.templateUrl].includes(
        e.filename
      );
      if (isSelfError) {
        this.handleError([e as any]);
      }
    });
  }
  private async compilerSFC(code: string): Promise<string> {
    code = templateWrap(code);
    const hasScript = /\<script.*?\>.*\<\/script.*?\>/s.test(code);
    if (!hasScript) {
      code = `${code}
         <script>export default {}</script>
         `;
    }

    const ast = compiler.parse(code, { filename: "none" });

    // 如果有错误,给出错误信息
    if (ast.errors) {
      this.handleError(ast.errors);
    }

    const id = generateID();

    const template = this.compilerTemplate(ast, id);

    this.templateUrl = createObjectURL(template);

    const script = await this.compilerScript(ast, id);

    this.compilerStyle(ast, id);

    return script;
  }
  async compileCode(code: string): Promise<undefined | string> {
    // 清空之前的 ObjectURL
    this.revokeAllObjectURL();
    // 创建createScriptEl
    this.createScriptEl();
    try {
      let App: string | undefined = "";
      if (this.lang === "jsx" || this.lang === "tsx") {
        App = await this.compilerJsx(code);
      } else if (this.lang === "vue") {
        App = await this.compilerSFC(code);
      }
      if (!App) {
        return;
      }
      this.scriptUrl = createObjectURL(App);
      // 运行代码
      const res = this.runCode();
      this.clearError();
      return res;
    } catch (e) {
      this.handleError([e as any]);
      throw e;
    }
  }
  private async compilerJsx(code: string): Promise<string | undefined> {
    const transform = await loadBabelTransform();
    const vue3JSXPlugin = await loadVueJsxPlugin();
    const plugins: any[] = [vue3JSXPlugin];

    if (this.isTypeScript) {
      const ts = await loadTsPlugin();
      plugins.push([ts, { isTSX: true }]);
    }
    try {
      const res = transform(code, {
        plugins,
      });

      const transformCode = handleImportMaps(res.code);

      if (!/export default/.test(transformCode)) {
        this.handleError([new Error("No default export found")]);
        return;
      }

      return transformCode;
    } catch (err: any) {
      this.handleError(Array.isArray(err) ? err : [err]);
    }
  }
  private createScriptEl() {
    // 有 scriptEl 了,需要删除一个scriptEl ,再添加一个新的 scriptEl,js代码才能执行
    // 修改innerHTML 无法执行
    if (this.scriptEl) {
      this.scriptEl.remove();
    }
    this.scriptEl = document.createElement("script");
    this.scriptEl.type = "module";
    document.body.appendChild(this.scriptEl);
  }
  private compilerTemplate(ast: compiler.SFCParseResult, id: string) {
    const temp = compiler.compileTemplate({
      source: ast.descriptor.template?.content || "",
      id,
      scoped: true,
      filename: ast.descriptor.filename, //大概不需要文件名
      slotted: ast.descriptor.slotted,
    });
    const template = temp.code;

    return handleImportMaps(template);
  }
  private async compilerScript(ast: compiler.SFCParseResult, id: string) {
    const { descriptor } = ast;
    this.isTypeScript =
      descriptor.script?.lang === "ts" || descriptor.scriptSetup?.lang === "ts";
    const res = compiler.compileScript(descriptor, {
      id,
      sourceMap: true,
      babelParserPlugins: this.isTypeScript ? ["typescript"] : [],
      templateOptions: {
        id,
        source: ast.descriptor.template?.content || "",
        filename: descriptor.filename,
        scoped: true,
        slotted: descriptor.slotted,
        compilerOptions: {
          scopeId: `data-v-${id}`,
          mode: "module",
          expressionPlugins: this.isTypeScript ? ["typescript"] : [],
        },
      },
    });

    let transformCode = res.content;

    if (this.isTypeScript) {
      const transform = await loadBabelTransform();
      const ts = await loadTsPlugin();
      transformCode = transform(transformCode, {
        plugins: [[ts]],
      }).code;
    }
    if (!transformCode) {
      return "";
    }

    transformCode = transformCode.replace("export default", "const _script =");
    transformCode = handleImportMaps(transformCode);

    return `
      import {render as __render} from "${this.templateUrl}"
      ${transformCode}
      _script.render = __render;
      _script.components = _app._context.components;
      _script.__scopeId = "data-v-${id}"; //节点的 __scopeId
      export default _script;
    `;
  }
  private compilerStyle(ast: compiler.SFCParseResult, id: string) {
    const allStyles = ast.descriptor.styles.reduce((allStyles, item) => {
      const res = compiler.compileStyle({
        source: item.content,
        filename: ast.descriptor.filename,
        id,
        scoped: true,
      });
      return `${allStyles}\n${res.code}`;
    }, "");
    this.styleEl.innerHTML = allStyles;
  }
  private runCode(): string {
    const main = handleImportMaps(`
    import { createApp,h,render } from 'vue'
    import App from '${this.scriptUrl}'
    const vnode = h(App)
    vnode.appContext = _app._context; // 全局app
    const root = document.querySelector('${this.selector}');
    render(vnode,root)
    `);

    // 插入script
    if (this.scriptEl) {
      this.scriptEl.innerHTML = main;
    }

    return main;
  }
  private handleError(errors: (compiler.CompilerError | SyntaxError)[]) {
    this.onError(errors);
  }
  private clearError() {
    this.onError([]);
  }
  private handleRunTimeError() {
    // window 错误捕获
    this.listenError();
    if (window) {
      (window as any)[`__onError${this._id}`] = (
        err: any,
        component: any,
        info: any
      ) => {
        this.handleError(Array.isArray(err) ? err : [err]);
        throw err;
      }; //全局可挂载一个错误函数,用于捕获执行时的报错
    }
  }

  private revokeAllObjectURL() {
    if (this.templateUrl) {
      URL.revokeObjectURL(this.templateUrl);
    }
    if (this.scriptUrl) {
      URL.revokeObjectURL(this.scriptUrl);
    }
  }
}

function createObjectURL(content: any, type?: string): string {
  if (!type) {
    type = "application/javascript";
  }
  return URL.createObjectURL(
    new Blob([content], { type: "application/javascript" })
  );
}
function generateID() {
  return Math.random().toString(36).slice(2, 12);
}

async function loadTsPlugin() {
  return await import("@babel/plugin-transform-typescript").then(
    (m) => m.default
  );
}

async function loadBabelTransform() {
  return await import("@babel/standalone").then(({ transform }) => transform);
}

async function loadVueJsxPlugin() {
  return await import("@vue/babel-plugin-jsx").then((module) => {
    return module.default;
  });
}

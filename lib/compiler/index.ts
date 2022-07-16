import { templateWrap } from "./templateWrap";
import { getApp, initialApp, initialVue } from "../memo";
import { handleImportMaps } from "./importMaps";
import * as compiler from "vue/compiler-sfc";
import { App } from "vue";

type ErrorFn = (errors: (compiler.CompilerError | SyntaxError)[]) => void;
let g_id = 0;
initialVue();
initialApp();
export default class Compiler {
  private selector: string;
  private scriptEl: HTMLScriptElement | null = null;
  private templateUrl = "";
  private scriptUrl = "";
  private _id = g_id;
  private styleEl = document.createElement("style");
  private onError: ErrorFn = () => {};
  constructor(selector: string, onError?: ErrorFn) {
    this.selector = selector;
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
        this.onError([e as any]);
      }
    });
  }
  async compileCode(code: string): Promise<string | undefined> {
    code = templateWrap(code);

    try {
      // 清空之前的 ObjectURL
      this.revokeAllObjectURL();
      // 创建createScriptEl
      this.createScriptEl();
      const hasSciprt = /\<script.*?\>.*\<\/script.*?\>/s.test(code);

      if (!hasSciprt) {
        code = `${code}
        <script>export default {}</script>
        `;
      }

      const ast = compiler.parse(code, { filename: "none" });

      // 如果有错误,给出错误信息
      this.handleError(ast);

      const id = generateID();

      const template = this.compilerTemplate(ast, id);

      this.templateUrl = createObjectURL(template);

      const script = this.compilerScript(ast, id);
      this.compilerStyle(ast, id);
      if (!script) {
        return;
      }
      this.scriptUrl = createObjectURL(script);

      // 运行代码
      return this.runCode();
    } catch (e) {
      this.onError([e as any]);
      throw e;
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
    // console.log(template)

    return handleImportMaps(template);
  }
  private compilerScript(ast: compiler.SFCParseResult, id: string) {
    const { descriptor } = ast;

    const res = compiler.compileScript(descriptor, {
      id,
      sourceMap: true,
      templateOptions: {
        id,
        source: ast.descriptor.template?.content || "",
        filename: descriptor.filename,
        scoped: true,
        slotted: descriptor.slotted,
        compilerOptions: {
          scopeId: `data-v-${id}`,
          mode: "module",
        },
      },
    });

    let script = res.content;
    if (!script) {
      return "";
    }

    script = script.replace("export default", "const _script =");
    script = handleImportMaps(script);

    return `
      import {render as __render} from "${this.templateUrl}"
      ${script}
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
    const root = document.querySelector('${this.selector}');
    render(vnode,root)
    `);

    // 插入script
    if (this.scriptEl) {
      this.scriptEl.innerHTML = main;
    }

    return main;
  }
  private handleError(ast: compiler.SFCParseResult) {
    this.onError(ast.errors);
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
        if (Array.isArray(err)) {
          this.onError(err);
        } else {
          // vue 全局捕获的错误
          // err.name = "appErrorHandler";
          this.onError([err]);
        }
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

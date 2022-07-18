import * as compiler from "vue/compiler-sfc";
declare type ErrorFn = (errors: (compiler.CompilerError | SyntaxError)[]) => void;
export default class Compiler {
    private selector;
    private scriptEl;
    private templateUrl;
    private scriptUrl;
    private _id;
    private styleEl;
    private onError;
    constructor(selector: string, onError?: ErrorFn);
    listenError(): void;
    compileCode(code: string): Promise<string | undefined>;
    private createScriptEl;
    private compilerTemplate;
    private compilerScript;
    private compilerStyle;
    private runCode;
    private handleError;
    private handleRunTimeError;
    private revokeAllObjectURL;
}
export {};

import { InjectionKey } from "vue";
import { CompilerError } from "vue/compiler-sfc";
export declare const ConfigToken: InjectionKey<Iconfig>;
export interface Iconfig {
    ms: number;
    defaultDirection: "row" | "column";
    handleError?: (err: CompilerError | SyntaxError[]) => void;
}

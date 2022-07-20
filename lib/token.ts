import { InjectionKey } from "vue";
import { CompilerError } from "vue/compiler-sfc";

export const ConfigToken: InjectionKey<IConfig> = Symbol();

export interface IConfig {
  ms: number; //代码节流时长
  defaultDirection: "row" | "column";
  handleError?: (err: CompilerError | SyntaxError[]) => void;
}

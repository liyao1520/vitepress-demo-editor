import Compiler from "../compiler";
declare const _sfc_main: import("vue").DefineComponent<{
    initialValue: {
        type: StringConstructor;
        required: true;
    };
    direction: {
        type: StringConstructor;
        required: false;
    };
}, {
    ms: number;
    defaultDirection: "row" | "column";
    handleError: ((err: import("@vue/compiler-core").CompilerError | SyntaxError[]) => void) | undefined;
    props: {
        initialValue: string;
        direction?: "row" | "column" | undefined;
    };
    direction: "row" | "column";
    demoEditShow: import("vue").Ref<boolean>;
    errors: import("vue").Ref<any[]>;
    editHeight: import("vue").Ref<number>;
    viewRef: import("vue").Ref<HTMLDivElement | null>;
    editRef: any;
    randomId: import("vue").Ref<string>;
    toolsShow: import("vue").Ref<boolean>;
    autoHeight: () => void;
    resetCode: () => void;
    compiler: Compiler;
    debounce: (fn: (...args: any[]) => any, wait: number) => (...args: any[]) => void;
    compileCode: (...args: any[]) => void;
    handleChange: (content: string) => void;
    Edit: import("vue").DefineComponent<{
        initialValue: {
            type: StringConstructor;
            default: string;
        };
        theme: {
            type: StringConstructor;
            default: string;
        };
        language: {
            type: StringConstructor;
            default: string;
        };
    }, {
        props: Readonly<import("@vue/shared").LooseRequired<Readonly<import("vue").ExtractPropTypes<{
            initialValue: {
                type: StringConstructor;
                default: string;
            };
            theme: {
                type: StringConstructor;
                default: string;
            };
            language: {
                type: StringConstructor;
                default: string;
            };
        }>> & {
            onChange?: ((...args: any[]) => any) | undefined;
        }>>;
        emit: (event: "change", ...args: any[]) => void;
        monacoContainer: import("vue").Ref<HTMLDivElement | null>;
        monacoInstance: any;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "change"[], "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        initialValue: {
            type: StringConstructor;
            default: string;
        };
        theme: {
            type: StringConstructor;
            default: string;
        };
        language: {
            type: StringConstructor;
            default: string;
        };
    }>> & {
        onChange?: ((...args: any[]) => any) | undefined;
    }, {
        initialValue: string;
        theme: string;
        language: string;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    initialValue: {
        type: StringConstructor;
        required: true;
    };
    direction: {
        type: StringConstructor;
        required: false;
    };
}>>, {}>;
export default _sfc_main;

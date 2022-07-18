declare const _sfc_main: import("vue").DefineComponent<{
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
export default _sfc_main;

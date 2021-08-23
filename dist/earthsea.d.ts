import { FmmMapString, FmmStoreValues } from '@eafmm/core';
declare type SetStrArray = (s: string[]) => void;
export declare abstract class Ea {
    static readonly adventures: Record<string, string>;
    static readonly controls: Record<keyof Earthsea | string, Record<string, string>>;
    static readonly css = "\n\tbody {\n\t\tfont-family: sans-serif;\n\t\t-webkit-font-smoothing: antialiased;\n\t\t-moz-osx-font-smoothing: grayscale;\n\t}\n\tdiv.headbar {\n\t\tbackground: whitesmoke;\n\t\tborder: 1px solid black;\n\t\tpadding: 5px 10px;\n\t}\n\tdiv.heading {\n\t\tfloat: left;\n\t}\n\tdiv.heading h1 {\n\t\tfont-weight: 500;\n\t\tmargin: 0;\n\t}\n\tdiv.anchors {\n\t\tfloat: right;\n\t\tpadding-top: 4px;\n\t\twidth: 2%;\n\t}\n\tdiv.anchors > div {\n\t\theight: 1rem;\n\t}\n\tdiv.anchor > div.active {\n\t\tborder: 1px solid blue;\n\t}\n\t.fmm-panel {\n\t\tfloat: right;\n\t\theight: 6.5rem;\n\t\tmargin: 5px;\n\t\twidth: 10%;\n\t}\n\tdiv.detail {\n\t\tfloat: right;\n\t\twidth: 38%;\n\t}\n\tdiv.fmm-detail {\n\t\twidth: 400px;\n\t}\n\tdiv.fmm-popup {\n\t\theight: 6rem;\n\t}\n\tdiv.fmm-frame {\n\t\tborder-left: 2px solid darkgray;\n\t\tborder-right: 2px solid darkgray;\n\t\tpadding: 0 2px;\n\t}\n\tlabel.form-check-label {\n\t\twhite-space: nowrap;\n\t}\n\t";
    static readonly debounceMsec = 200;
    static readonly initialValues: Earthsea;
    static readonly messages: Record<keyof Earthsea | string, Record<string, string>>;
    static readonly namesAll: Record<string, string>;
    static readonly quotes: {
        a: string;
        b: string;
        c: string;
        d: string;
        e: string;
        f: string;
        g: string;
        h: string;
        i: string;
        j: string;
        k: string;
        l: string;
    };
    static readonly aggregateLabels: FmmMapString;
    readonly fAddRandomUseName: () => void;
    readonly fOnUpdate: () => void;
    readonly fRemoveUncheckedUseNames: () => void;
    readonly fSubmit: () => void;
    readonly names1000: string[];
    readonly randomQuotes: [string, string][];
    customElementIds: string[];
    realNamesShown: string[];
    submitted: boolean;
    useNamesShown: string[];
    private readonly namesRemaining;
    private useNamesShownAsBooleanArray;
    protected constructor();
    static randomize<T>(input: T[], count?: number): T[];
    addRandomUseName(): void;
    onChangeUseName(elts: Element | RadioNodeList): void;
    onUpdate(): void;
    removeUncheckedUseNames(): void;
    setUseNamesSelected(names: string[]): void;
    submit(): void;
    protected mapUseNamesToBooleanArray(names: string[]): boolean[];
    protected takeSnapshot(): void;
    protected updateRealNamesShown(): void;
    protected useNamesGetSelected(): boolean[];
    private composeMinimap;
    protected abstract updateRealNamesSelected(_namesRemoved: string[]): void;
    protected abstract useNamesAdded(_index: number, _useName: string): void;
    protected abstract useNamesRemoved(_indexesRemovedInReverse: number[]): void;
}
export declare class EaReactive extends Ea {
    constructor();
    protected updateRealNamesSelected(_namesRemoved: string[]): void;
    protected useNamesAdded(_: number, _n: string): void;
    protected useNamesRemoved(_: number[]): void;
}
export declare class EaState extends Ea {
    private setStateRealNamesShown;
    private setStateUseNamesShown;
    constructor();
    setStateMutators(setStateRealNamesShown: SetStrArray, setStateUseNamesShown: SetStrArray): void;
    protected updateRealNamesSelected(_namesRemoved: string[]): void;
    protected updateRealNamesShown(): void;
    protected useNamesAdded(_: number, _n: string): void;
    protected useNamesRemoved(_: number[]): void;
}
export interface Earthsea extends FmmStoreValues {
    adventure: string;
    adventure2: string;
    adventureAuto: string;
    agree: boolean;
    danceDate: string;
    danceRange: number;
    danceToggle: boolean;
    deed: string;
    email: string;
    quoteRadios: string;
    realName: string;
    realNames: string[];
    realNames2: string[];
    useName: string;
    useNames: string[];
    useNamesAll: string[];
}
export {};

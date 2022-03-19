import { DataPaths, TypeData } from "./DataManager";
import { Directive } from "./Directive";

type MapObject<T=any> = {[k: string]: T};
type RendererFunction<R=any> = (node: Node) => R;

export interface NodeInfo<N extends Node = Node>
{
    id: string;
    render?: RendererFunction;
    // directive: Directive;
    // liveNodes?: N[];
    _t?: number;
}

export interface NodeElementInfo extends NodeInfo
{
    element: Element;
    placeholderComment: Comment;
    attrs: MapObject<AttrInfo>;
    directives: Directive<Element>[];
    // keyGetter?: (data: TypeData) => any;
}
export interface AttrInfo
{
    srcVal: string;
    // prevVal: any;
    paths: DataPaths;
    exec(data: TypeData);
    directive: Directive;
}
export interface ElementRenderInfo
{
    elementInfo: NodeElementInfo;
    exists: Node[];
    // attrsVal: MapObject<any>;
    // disableRenderChildNodes: boolean;
}

export interface NodeTextInfo extends NodeInfo
{
    // raw: string;
}

// interface NodeLiveData<N extends Node = Node>
// {
//     origin: NodeInfo;
//     node: N;
// }


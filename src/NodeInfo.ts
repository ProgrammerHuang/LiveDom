import { Directive } from "./Directive";
import { MapObject, RendererFunction, TypeData } from "./LiveDom";

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
    directives: Directive[];
    directiveAttrs: MapObject<AttrInfo>;
    // keyGetter?: (data: TypeData) => any;
}
export interface AttrInfo
{
    exec(data: TypeData);
}
export interface ElementRenderInfo
{
    elementInfo: NodeElementInfo;
    exists: Node[];
    renders: Element[];
    attrsVal: MapObject<any>;
    directivesVal: MapObject<any>;
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


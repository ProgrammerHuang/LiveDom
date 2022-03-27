import { DataPaths, TypeData } from "./DataManager";
import { Directive } from "./Directive";

type MapObject<T=any> = {[k: string]: T};
type RendererFunction<R=any> = (node: Node) => R;

export interface NodeInfo<N extends Node = Node>
{
    id: string;
    changed: boolean;
    render?: RendererFunction;
    // directive: Directive;
    // liveNodes?: N[];
    _t?: number;
}

export interface NodeElementInfo extends NodeInfo
{
    srcElement: Element;
    // placeholderComment: Comment;
    attrs: MapObject<AttrInfo>;
    directives: Directive<Element>[];
    // keyGetter?: (data: TypeData) => any;
    disableChildNodes: boolean;
}
export interface AttrInfo
{
    srcVal: string;
    // lastVal: any; //TODO 数据错乱, 当是一个复制的节点的话
    paths: DataPaths;
    exec(data: TypeData);
    directive: Directive;
}

export interface NodeTextInfo extends NodeInfo
{
    // src: string;
}

// interface NodeLiveData<N extends Node = Node>
// {
//     origin: NodeInfo;
//     node: N;
// }

export interface RenderInfo<NI extends NodeInfo = NodeInfo>
{
    nodeInfo: NI;
    // keyData: TypeData;
    // lastData: TypeData;
}

export interface ElementRenderInfo extends RenderInfo<NodeElementInfo>
{
    exists: Node[];
    lastAttrsVal: MapObject<any>;
    // disableRenderChildNodes: boolean;
}


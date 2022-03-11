import { PageController } from "./PageController";
import { ElementRenderInfo, NodeInfo } from "./NodeInfo";

export interface DirectiveConfig
{
    attr?: string;
    create: (controller: PageController, ele: Element, info: NodeInfo, config: DirectiveConfig)=>Directive|null;
}

export interface DirectiveRender<N extends Node = Node>
{
    (element: N, renderInfo: ElementRenderInfo): N[];
}
// class DirectiveText extends Directive
// {
// }


export abstract class Directive
{
    // public name: string = null;
    // public abstract buildNode(nodeInfo: NodeInfo, node: Node);
    public abstract render(element: Element, renderInfo: ElementRenderInfo, continueRender: DirectiveRender): Element[];
    // public abstract unsetNode(nodeInfo: NodeInfo);
    protected controller: PageController;
    protected constructor(controller: PageController)
    {
        this.controller = controller;
    }
}

// class DirectiveElementStateClass extends Directive //live-state="rendering|complete"
// {
// }
// class DirectiveElementContent extends Directive //live:cont
// {
// }


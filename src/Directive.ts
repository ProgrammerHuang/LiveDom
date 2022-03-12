import { PageController } from "./PageController";
import { ElementRenderInfo, NodeInfo } from "./NodeInfo";

export interface DirectiveConfig<N extends Node = Node>
{
    attr?: string;
    create: (controller: PageController, node: N, info: NodeInfo, config: DirectiveConfig<N>)=>Directive<N>|null;
}

export interface DirectiveRender<N extends Node = Node>
{
    (element: N, renderInfo: ElementRenderInfo): N[];
}
// class DirectiveText extends Directive
// {
// }


export abstract class Directive<N extends Node = Node>
{
    // public name: string = null;
    // public abstract buildNode(nodeInfo: NodeInfo, node: Node);
    public abstract render(element: N, renderInfo: ElementRenderInfo, continueRender: DirectiveRender<N>): N[];
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


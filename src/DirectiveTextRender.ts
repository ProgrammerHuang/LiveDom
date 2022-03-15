import { Directive, DirectiveConfig, DirectiveRender } from "./Directive";
import { NodeElementInfo, ElementRenderInfo } from "./NodeInfo";
import { PageController } from "./PageController";

export class DirectiveTextRender extends Directive
{
    public static create(controller: PageController, element: Element, info: NodeElementInfo, config: DirectiveConfig): DirectiveTextRender
    {
        if (!element.hasAttribute(config.attr))
            return null;

        element.removeAttribute(config.attr);

        return new DirectiveTextRender(controller, element);
    }

    // private element: Element;
    protected constructor(controller: PageController, element: Element)
    {
        super(controller);
        // this.element = element;
    }

    public render(element: Node, info: ElementRenderInfo, continueRender: DirectiveRender<Node>)
    {
        // console.log("DirectiveElementEach renderNode:", element, info);
        //TODO find prevNodeInfo, and is If or Each, and is placeholder
        // if(val)
        //     return continueRender(element, info);
        // return [];
        return continueRender(element, info);
    }
}

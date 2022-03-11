import { Directive, DirectiveConfig, DirectiveRender } from "./Directive";
import { NodeElementInfo, ElementRenderInfo } from "./NodeInfo";
import { PageController } from "./PageController";

export class DirectiveElementElse extends Directive
{
    public static create(controller: PageController, element: Element, info: NodeElementInfo, config: DirectiveConfig): DirectiveElementElse
    {
        if (!element.hasAttribute(config.attr))
            return null;

        element.removeAttribute(config.attr);

        return new DirectiveElementElse(controller, element);
    }

    // private element: Element;
    protected constructor(controller: PageController, element: Element)
    {
        super(controller);
        // this.element = element;
    }

    public render(element: Element, info: ElementRenderInfo, continueRender: DirectiveRender<Element>)
    {
        // console.log("DirectiveElementEach renderNode:", element, info);
        //TODO find prevNodeInfo, and is If or Each, and is placeholder
        // if(val)
        //     return continueRender(element, info);
        // return [];
        return continueRender(element, info);
    }
}

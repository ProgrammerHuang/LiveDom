import { Directive, DirectiveConfig, DirectiveRender } from "./Directive";
import { DirectiveElementEach } from "./DirectiveElementEach";
import { DirectiveElementIf } from "./DirectiveElementIf";
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
        // console.log("DirectiveElementElse renderNode:", element, element.previousElementSibling, info);
        let prevNode: Node = info.exists[0];
        while(prevNode = prevNode.previousSibling)
        {
            if(this.controller.isPlaceholder(prevNode))
            {
                const prevNodeInfo = this.controller.getNodeInfo(prevNode);
                if(DirectiveElementIf.hasDirective(prevNodeInfo) || DirectiveElementEach.hasDirective(prevNodeInfo))
                    return continueRender(element, info);
                
                break;
            }
            
            if(prevNode.nodeType == 1) //1: Node.ELEMENT_NODE
                break;
        }
        
        return [];
    }
}

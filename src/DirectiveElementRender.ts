import { Directive, DirectiveConfig, DirectiveRender } from "./Directive";
import { NodeElementInfo, ElementRenderInfo } from "./NodeInfo";
import { PageController } from "./PageController";

export class DirectiveElementRender extends Directive // rename to DirectiveElementNormalAttributes
{
    public static setup(controller: PageController, element: Element, info: NodeElementInfo, config: DirectiveConfig)
    {
        if(Object.keys(info.attrs).length == 0 && info.directives.length == 0)
            return ;
        
        const directive = new DirectiveElementRender(controller);
        info.directives.push(directive);
    }
    
    public static disableRenderChildNodes(renderInfo: ElementRenderInfo)
    {
        
    }
    
    public render(element: Element, info: ElementRenderInfo, continueRender: DirectiveRender<Element>)
    {
        // console.log("DirectiveElementRender renderNode:", element, info);
        const nodeInfo = info.nodeInfo;
        
        for (const attrName in nodeInfo.attrs)
        {
            // if has custom element and xxxxx()
            // else if attrVal != attr.value
            const attrInfo = nodeInfo.attrs[attrName];
            if(attrInfo.directive)
                continue ;
            
            const attrVal = attrInfo.exec(this.controller.dataManager.data);
            element.setAttribute(attrName, attrVal);
            info.lastAttrsVal[attrName] = attrVal;
        }
        
        this.controller.renderChildNodes(element);
        
        return continueRender(element, info);
    }
}

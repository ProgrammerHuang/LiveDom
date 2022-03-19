import { Directive, DirectiveConfig, DirectiveRender } from "./Directive";
import { NodeElementInfo, ElementRenderInfo } from "./NodeInfo";
import { PageController } from "./PageController";

export class DirectiveElementRender extends Directive
{
    public static setup(controller: PageController, element: Element, info: NodeElementInfo, config: DirectiveConfig)
    {
        const directive = new DirectiveElementRender(controller);
        info.directives.push(directive);
    }

    public render(element: Element, info: ElementRenderInfo, continueRender: DirectiveRender<Element>)
    {
        // console.log("DirectiveElementRender renderNode:", element, info);
        const elementInfo = info.elementInfo;

        for (const attrName in elementInfo.attrs)
        {
            // if has custom element and xxxxx()
            // else if attrVal != attr.value
            const attrInfo = elementInfo.attrs[attrName];
            if(attrInfo.directive)
                continue ;
            
            const attrVal = attrInfo.exec(this.controller.dataManager.data);
            // renderInfo.attrsVal[attrName] = attrVal;
            element.setAttribute(attrName, attrVal);
        }
        
        this.controller.renderChildNodes(element);
        
        return continueRender(element, info);
    }
}

import { Directive, DirectiveConfig, DirectiveRender } from "./Directive";
import { NodeElementInfo, ElementRenderInfo } from "./NodeInfo";
import { PageController } from "./PageController";

export class DirectiveElementRender extends Directive
{
    public static create(controller: PageController, element: Element, info: NodeElementInfo, config: DirectiveConfig): DirectiveElementRender
    {
        return new DirectiveElementRender(controller);
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
            const attrVal = attrInfo.exec(this.controller.dataManager.data);
            // renderInfo.attrsVal[attrName] = attrVal;
            element.setAttribute(attrName, attrVal);
        }

        this.controller.renderChildNodes(element);

        return continueRender(element, info);
    }
}

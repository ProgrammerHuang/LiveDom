import { Directive, DirectiveConfig, DirectiveRender } from "./Directive";
import { NodeElementInfo, AttrInfo, ElementRenderInfo } from "./NodeInfo";
import { PageController } from "./PageController";

export class DirectiveElementIf extends Directive
{
    public static create(controller: PageController, element: Element, info: NodeElementInfo, config: DirectiveConfig): DirectiveElementIf
    {
        if (!info.attrs[config.attr])
            return null;

        const attrInfo = info.attrs[config.attr];

        element.removeAttribute(config.attr);
        delete info.attrs[config.attr];

        return new DirectiveElementIf(controller, element, attrInfo);
    }

    // private element: Element;
    private attrInfo: AttrInfo;

    protected constructor(controller: PageController, element: Element, attrInfo: AttrInfo)
    {
        super(controller);
        // this.element = element;
        this.attrInfo = attrInfo;
    }

    public render(element: Element, info: ElementRenderInfo, continueRender: DirectiveRender<Element>)
    {
        // console.log("DirectiveElementEach renderNode:", element, info);
        const elementInfo = info.elementInfo;
        // const directiveAttrInfo = elementInfo.directiveAttrs[attrLiveEach];
        const val = this.attrInfo.exec(this.controller.dataManager.data);
        // console.log("DirectiveElementEach items:", items);
        if (val)
            return continueRender(element, info);

        return [];
    }
}

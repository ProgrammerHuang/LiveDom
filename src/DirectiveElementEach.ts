import { Directive, DirectiveConfig, DirectiveRender } from "./Directive";
import { NodeElementInfo, AttrInfo, ElementRenderInfo } from "./NodeInfo";
import { PageController } from "./PageController";

const propLiveKeyData = Symbol("LiveDomKeyDataProp");

export class DirectiveElementEach extends Directive
{
    public static create(controller: PageController, element: Element, info: NodeElementInfo, config: DirectiveConfig): DirectiveElementEach
    {
        if (!info.attrs[config.attr])
            return null;

        const attrInfo = info.attrs[config.attr];

        element.removeAttribute(config.attr);
        delete info.attrs[config.attr];

        return new DirectiveElementEach(controller, element, attrInfo);
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
        const items = this.attrInfo.exec(this.controller.dataManager.data);
        // console.log("DirectiveElementEach items:", items);
        // info.directivesVal[attrLiveEach] = items;
        let renderElements: Element[] = [];
        for (const item of items || [])
        {
            // console.log("DirectiveElementEach item:", item);
            const keyVal = item; //TODO keyGetter(item), default return item



            // console.log("processElementEach itemElement from exists: ", info.exists.find((ele: Element) => ele[propLiveKeyData]==keyVal && renderElements.indexOf(ele)<0));
            // const itemElement = this.controller.cloneNode(elementInfo.element);
            const itemElement = info.exists.find((ele: Element) => propLiveKeyData in ele && ele[propLiveKeyData] == keyVal && renderElements.indexOf(ele) < 0) as Element ||
                this.controller.cloneNode(elementInfo.element);
            itemElement[propLiveKeyData] = keyVal;

            const scopeData = { item };
            this.controller.dataManager.pushScopeData(scopeData);
            const itemRenderElements = continueRender(itemElement, info);
            this.controller.dataManager.popScopeData(scopeData);

            if (itemRenderElements.length > 0)
                renderElements.push(itemRenderElements[0]);
        }

        return renderElements;
    }
}

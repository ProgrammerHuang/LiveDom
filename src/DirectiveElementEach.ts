import { Directive, DirectiveConfig, DirectiveRender } from "./Directive";
import { NodeElementInfo, AttrInfo, ElementRenderInfo } from "./NodeInfo";
import { PageController } from "./PageController";

const propLiveKeyData = Symbol("LiveDomKeyDataProp");

export class DirectiveElementEach extends Directive
{
    public static setup(controller: PageController, element: Element, info: NodeElementInfo, config: DirectiveConfig)
    {
        if (!info.attrs[config.attr])
            return ;
        
        const attrInfo = info.attrs[config.attr];
        const directive = new DirectiveElementEach(controller, element, attrInfo);
        
        element.removeAttribute(config.attr);
        info.attrs[config.attr].directive = directive;
        
        if(element.hasAttribute("live:item"))
        {
            directive.itemName = element.getAttribute("live:item");
            element.removeAttribute("live:item");
        }
        
        if(element.hasAttribute("live:index"))
        {
            directive.indexName = element.getAttribute("live:index");
            element.removeAttribute("live:index");
        }
        
        info.directives.push(directive);
    }
    
    // private element: Element;
    private attrInfo: AttrInfo;
    private itemName: string = "item";
    private indexName: string = "index";
    
    protected constructor(controller: PageController, element: Element, attrInfo: AttrInfo)
    {
        super(controller);
        // this.element = element;
        this.attrInfo = attrInfo;
    }
    
    public render(element: Element, info: ElementRenderInfo, continueRender: DirectiveRender<Element>)
    {
        // console.log("DirectiveElementEach renderNode:", element, info);
        const nodeInfo = info.nodeInfo;
        // const directiveAttrInfo = elementInfo.directiveAttrs[attrLiveEach];
        const items = this.attrInfo.exec(this.controller.dataManager.data);
        // console.log("DirectiveElementEach items:", items);
        // info.directivesVal[attrLiveEach] = items;
        
        if(!Array.isArray(items) || items.length == 0)
            return [];
        
        let renderElements: Element[] = [];
        for(let i=0, l=items.length; i<l; ++i)
        {
            const item = items[i];
            // console.log("DirectiveElementEach item:", item);
            const keyVal = item; //TODO keyGetter(item), default return item
            
            // console.log("processElementEach itemElement from exists: ", info.exists.find((ele: Element) => ele[propLiveKeyData]==keyVal && renderElements.indexOf(ele)<0));
            // const itemElement = this.controller.cloneNode(elementInfo.element);
            let itemElement: Element = null;
            for(const ele of info.exists as Element[])
            {
                if(propLiveKeyData in ele && ele[propLiveKeyData] == keyVal && renderElements.indexOf(ele) < 0)
                {
                    // console.log("each propLiveKeyData:", keyVal, ele);
                    itemElement = ele;
                    break;
                }
            }
            if(!itemElement)
                itemElement = this.controller.cloneNode(nodeInfo.srcElement);
            
            const renderInfo: ElementRenderInfo = {
                ...info,
                ...this.controller.getRenderInfo(itemElement) as ElementRenderInfo,
            };
            
            itemElement[propLiveKeyData] = keyVal;
            
            const scopeData = { [this.itemName]: item, [this.indexName]: i };
            this.controller.dataManager.pushScopeData(scopeData);
            const itemRenderElements = continueRender(itemElement, renderInfo);
            this.controller.dataManager.popScopeData(scopeData);
            // console.log("itemElement html:", item, itemElement.innerHTML);
            
            if (itemRenderElements.length > 0)
                renderElements.push(itemRenderElements[0]);
        }
        
        return renderElements;
    }
}

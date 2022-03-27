import { Directive, DirectiveConfig, DirectiveRender } from "./Directive";
import { NodeElementInfo, AttrInfo, ElementRenderInfo } from "./NodeInfo";
import { PageController } from "./PageController";

//TODO skip setup children

export class DirectiveElementInnerHtml extends Directive
{
    public static setup(controller: PageController, element: Element, info: NodeElementInfo, config: DirectiveConfig)
    {
        if (!info.attrs[config.attr])
            return ;
        
        const attrInfo = info.attrs[config.attr];
        const directive = new DirectiveElementInnerHtml(controller, element, attrInfo);
        
        info.disableChildNodes = true;
        element.removeAttribute(config.attr);
        info.attrs[config.attr].directive = directive;
        info.directives.push(directive);
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
        // const elementInfo = info.nodeInfo;
        const val = this.attrInfo.exec(this.controller.dataManager.data);
        // console.log("DirectiveElementEach items:", items);
        element.innerHTML = val;
        return continueRender(element, info);
    }
}

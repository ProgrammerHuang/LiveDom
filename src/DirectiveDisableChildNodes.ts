import { Directive, DirectiveConfig, DirectiveRender } from "./Directive";
import { NodeElementInfo, AttrInfo, ElementRenderInfo } from "./NodeInfo";
import { PageController } from "./PageController";

//TODO 优化不进内部进行setup, 但如果值是动态的话, 可能会引起错误或复杂性
//TODO 如果只对内部渲染时, 可能会忽略了这个设置, 可以在开始渲染标签时先检查这个标签是否在禁止标签里

export class DirectiveDisableChildNodes extends Directive
{
    public static setup(controller: PageController, element: Element, info: NodeElementInfo, config: DirectiveConfig)
    {
        if (!element.hasAttribute(config.attr))
            return ;
        
        const attrInfo = info.attrs[config.attr];
        const directive = new DirectiveDisableChildNodes(controller, element, attrInfo);
        const val = element.getAttribute(config.attr) || "true";
        info.disableChildNodes = (val.toLowerCase() != "false");
        element.removeAttribute(config.attr);
        // info.attrs[config.attr].directive = directive;
        info.directives.push(directive);
    }
    
    // private element: Element;
    // private attrInfo: AttrInfo;
    
    protected constructor(controller: PageController, element: Element, attrInfo: AttrInfo)
    {
        super(controller);
        // this.element = element;
        // this.attrInfo = attrInfo;
    }
    
    public render(element: Element, info: ElementRenderInfo, continueRender: DirectiveRender<Element>)
    {
        // console.log("DirectiveElementEach renderNode:", element, info);
        // const elementInfo = info.nodeInfo;
        // const directiveAttrInfo = elementInfo.directiveAttrs[attrLiveEach];
        // const val = this.attrInfo.exec(this.controller.dataManager.data);
        // console.log("DirectiveElementEach items:", items);
        
        return continueRender(element, info);
    }
}

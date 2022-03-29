import { Directive, DirectiveConfig, DirectiveRender } from "./Directive";
import { NodeElementInfo, AttrInfo, ElementRenderInfo } from "./NodeInfo";
import { PageController } from "./PageController";


export class DirectiveHtmlTemplate extends Directive
{
    public static setup(controller: PageController, element: Element, info: NodeElementInfo, config: DirectiveConfig)
    {
        if (!element.hasAttribute(config.attr))
            return ;
        
        const attrVal = element.getAttribute(config.attr);
        const attrInfo = info.attrs[config.attr];
        const directive = new DirectiveHtmlTemplate(controller, element);
        directive.attrInfo = attrInfo;
        directive.attrVal = attrVal;
        element.removeAttribute(config.attr);
        
        if(attrInfo)
            attrInfo.directive = directive;
        
        info.directives.push(directive);
    }
    
    private element: Element;
    private attrInfo: AttrInfo;
    private attrVal: string;
    
    protected constructor(controller: PageController, element: Element)
    {
        super(controller);
        this.element = element;
    }
    
    public render(element: Element, info: ElementRenderInfo, continueRender: DirectiveRender<Element>)
    {
        // console.log("DirectiveElementEach renderNode:", element, info);
        // const elementInfo = info.nodeInfo;
        
        const templateId = this.attrInfo ? this.attrInfo.exec(this.controller.dataManager.data) : this.attrVal;
        const template = (element.ownerDocument.getElementById(templateId) as HTMLTemplateElement).content;
        
        const shadow = element.shadowRoot || element.attachShadow({mode: "open"});
        shadow.innerHTML = "";
        shadow.appendChild(template.cloneNode(true)); //TODO controller.cloneNode()
        
        return continueRender(element, info);
    }
}

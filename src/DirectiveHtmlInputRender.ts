import { Directive, DirectiveConfig, DirectiveRender } from "./Directive";
import { NodeElementInfo, ElementRenderInfo, AttrInfo } from "./NodeInfo";
import { PageController } from "./PageController";

type AttrsInfoMap = {[name: string]: AttrInfo};

export class DirectiveHtmlInputRender extends Directive
{
    public static setup(controller: PageController, element: Element, info: NodeElementInfo, config: DirectiveConfig)
    {
        if(element.tagName.toLocaleLowerCase() != "input")
            return null;
        
        const attrs: AttrsInfoMap = {};
        
        if(element.hasAttribute("value") && info.attrs.value)
        {
            attrs.value = info.attrs.value;
            element.removeAttribute("value");
            delete info.attrs.value;
        }
        
        if(element.hasAttribute("checked") && info.attrs.checked)
        {
            attrs.checked = info.attrs.checked;
            element.removeAttribute("checked");
            delete info.attrs.checked;
        }
        
        if(Object.keys(attrs).length > 0)
        {
            info.directives.push(new DirectiveHtmlInputRender(controller, element, attrs));
        }
    }
    
    // private element: Element;
    private attrs: AttrsInfoMap;

    protected constructor(controller: PageController, element: Element, attrs: AttrsInfoMap)
    {
        super(controller);
        // this.element = element;
        this.attrs = attrs;
    }

    public render(element: HTMLInputElement, info: HtmlInputRenderInfo, continueRender: DirectiveRender<Element>)
    {
        // console.log("DirectiveElementEach renderNode:", element, info);
        
        if(this.attrs.value && this.controller.dataManager.hasUseLastMergeData(this.attrs.value.paths))
        {
            //TODO check has use merge data
            const val = this.attrs.value.exec(this.controller.dataManager.data);
            element.setAttribute("value", val);
            element.value = val;
        }
        
        if(this.attrs.checked && this.controller.dataManager.hasUseLastMergeData(this.attrs.checked.paths))
        {
            //TODO check has use merge data
            const val = this.attrs.checked.exec(this.controller.dataManager.data);
            // element.setAttribute("value", val);
            element.checked = !!val;
        }
        
        // console.log("DirectiveElementEach items:", items);
        return continueRender(element, info);
    }
}

interface HtmlInputRenderInfo extends ElementRenderInfo
{
    
}

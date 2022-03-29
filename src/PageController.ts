import { DomScanner } from "./DomScanner";
import { DomScannerLoaded } from "./DomScannerLoaded";
import { Parser } from "./Parser";
import { PageOptions } from "./Page";
import { DataManager, TypeData } from "./DataManager";
import { AttrInfo, ElementRenderInfo, NodeElementInfo, NodeInfo, NodeTextInfo, RenderInfo } from "./NodeInfo";
import { Directive, DirectiveConfig } from "./Directive";

const propNodeInfo = Symbol("LiveDomNodeInfoProp");
const propRenderInfo = Symbol("LiveDomRenderInfoProp");
// const attrLiveName = "_ld";
// const attrLiveEach = "live:each";
// const attrLiveIf = "live:if";
// const attrLiveElse = "live:else";
let nextId = 1001;

interface PageControllerOptions extends PageOptions
{
    elementDirectivesConfig: DirectiveConfig<Element>[];
}

export class PageController
{
    public doc: Document;
    public options: PageOptions;
    public dataManager: DataManager;
    public scanCompletedPromise: Promise<void> = null;
    
    private scanner: DomScanner;
    private elementDirectivesConfig: DirectiveConfig<Element>[];
    // private directiveText: DirectiveText;
    // private nodeInfos: MapObject<NodeInfo>;
    private requestRenderPagePromise: Promise<void> = null;
    
    public constructor(doc: Document, options: PageControllerOptions)
    {
        this.doc = doc;
        this.options = options;
        this.dataManager = new DataManager(this.options.data || {});
        this.elementDirectivesConfig = options.elementDirectivesConfig;
        // this.directiveText = new DirectiveText();
        // this.nodeInfos = {};
        
        this.scanner = new DomScannerLoaded(document, {
            elementStart: this.scanElementStart.bind(this),
            elementEnd: this.scanElementEnd.bind(this),
            comment: this.scanComment.bind(this),
            text: this.scanText.bind(this),
            attrChanged: this.onAttrChanged.bind(this),
        });
        
        this.scanCompletedPromise = this.scanner.scan().
        then(() =>
        {
            if(this.options.onPageSetupCompleted)
                this.options.onPageSetupCompleted();
            
            this.requestRenderPage();
        });
    }
    
    public updatePageData(data: TypeData = {}) : Promise<void>
    {
        // console.log("updatePageData:", data);
        this.dataManager.mergePageData(data);
        return this.requestRenderPage();
    }
    private requestRenderPage() : Promise<void>
    {
        if(this.requestRenderPagePromise)
            return this.requestRenderPagePromise;
        
        return this.requestRenderPagePromise = this.scanCompletedPromise.
        then(() => wait(5)).
        then(() =>
        {
            this.requestRenderPagePromise = null;
            this.renderElement(this.doc.documentElement);
            this.dataManager.commitMergeData();
        });
    }
    
    private scanElementStart(element: Element) : void
    {
        // console.log("elementStart:", element);
        if(this.isLiveNode(element))
            return ;
        
        this.setupElement(element);
    }
    private scanElementEnd(element: Element) : void
    {
        // this.renderElement(element);
    }
    private scanComment(comment: Comment) : void
    {
        // console.log("comment:", comment);
    }
    private scanText(text: Text) : void
    {
        // console.log("text:", text);
        if(this.isLiveNode(text))
            return ;
        
        this.setupText(text);
    }
    
    private onAttrChanged(element: Element, attrName: string)
    {
        const nodeInfo = this.getNodeInfo(element) as NodeElementInfo;
        if(!nodeInfo)
            return this.setupElement(element);
        
        const renderInfo = this.getRenderInfo(element) as ElementRenderInfo;
        const newVal = element.getAttribute(attrName);
        let attrInfo = nodeInfo.attrs[attrName];
        
        if(!attrInfo) // not live attr
        {
            if(newVal && (attrInfo = this.createAttribute(newVal)))
            {
                nodeInfo.attrs[attrName] = attrInfo;
                this.setupElementDirectives(element, nodeInfo);
            }
            return ;
        }
        
        if(newVal == renderInfo.lastAttrsVal[attrName]) //skip, change by render
            return ;
        
        if(!newVal) // attr removed
        {
            delete nodeInfo.attrs[attrName];
            this.setupElementDirectives(element, nodeInfo);
            return ;
        }
        
        if(attrInfo.srcVal != newVal) //attr really changed
        {
            attrInfo = this.updateAttribute(attrInfo, newVal);
            if(!attrInfo)
                delete nodeInfo.attrs[attrName];
            
            this.setupElementDirectives(element, nodeInfo);
            return ;
        }
    }
    
    private setupElement(element: Element)
    {
        const info: NodeElementInfo = this.getNodeInfo(element) as NodeElementInfo || {
            id: 'LDE'+(nextId++),
            srcElement: element,
            // placeholderComment: null,
            attrs: {},
            directives: [],
            disableChildNodes: false,
        };
        
        this.setupElementAttributes(element, info);
        this.setupElementDirectives(element, info);
        // element.setAttribute("ld-track-id", info.id);
        
        if(Object.keys(info.attrs).length == 0 && info.directives.length == 0)
        {
            this.setNodeInfo(element, null);
            return ;
        }
        
        info.render = this.renderElement.bind(this);
        this.setNodeInfo(element, info);
    }
    private setupElementAttributes(element: Element, info: NodeElementInfo)
    {
        const attrs = element.attributes;
        for(let i=attrs.length-1; i>=0; --i)
        {
            const attr = attrs[i];
            // if(info.attrs[attr.name] && info.attrs[attr.name].srcVal == attr.value)
            //     continue;
            
            const attrInfo = this.createAttribute(attr.value);
            // console.log("initElement attribute:", attr, attrInfo);
            if(attrInfo)
                info.attrs[attr.name] = attrInfo;
            else
                delete info.attrs[attr.name];
        }
    }
    private createAttribute(attrVal: string) : AttrInfo
    {
        const parseResult = Parser.parseText(attrVal);
        if(!Parser.hasTextExpress(parseResult))
            return null;
        
        const exec = parseResult.exec;
        const info = {
            srcVal: attrVal,
            lastVal: attrVal,
            paths: parseResult.paths,
            exec: function(data) { return info.lastVal = exec(data); },
            directive: null,
        };
        
        return info;
    }
    private updateAttribute(info: AttrInfo, attrVal)
    {
        const parseResult = Parser.parseText(attrVal);
        if(!Parser.hasTextExpress(parseResult))
            return null;
        
        const exec = parseResult.exec;
        info.exec = exec;
        info.srcVal = attrVal;
        
        return info;
    }
    private setupElementDirectives(element: Element, info: NodeElementInfo)
    {
        info.directives = [];
        
        for(const config of this.elementDirectivesConfig)
        {
            config.setup(this, element, info, config);
        }
    }
    private renderElement(element: Element)
    {
        const nodeInfo = this.getNodeInfo(element) as NodeElementInfo;
        // console.log("renderElement:", placeholder, this.isLiveNode(placeholder), elementInfo);
        if(! nodeInfo)
        {
            this.renderChildNodes(element);
            return ;
        }
        
        const exists: Node[] = [element];
        let nextNode = element.nextSibling;
        while(nextNode)
        {
            const nextInfo = this.getNodeInfo(nextNode);
            if(nextInfo != nodeInfo)
                break;
            
            exists.push(nextNode);
            nextNode = nextNode.nextSibling;
        }
        // console.log("renderElement exists:", placeholder, exists, exists.map(n => n.parentNode));
        
        const renderInfo: ElementRenderInfo = {
            lastAttrsVal: {},
            ...this.getRenderInfo(element) as ElementRenderInfo,
            nodeInfo: nodeInfo,
            exists,
        };
        
        const srcElement = element.nodeType==1 ? element : nodeInfo.srcElement;
        const renderElements = this.processElementDirectiveRender(srcElement, renderInfo, 0);
        // console.log("renderElement renderElements:", placeholder, placeholder.parentNode, element, renderElements, renderInfo);
        if(renderElements.length == 0)
        {
            // console.log("renderElement renderElements remove:", exists.length, element.parentNode, element);
            const placeholderComment = this.getPlaceholderComment(nodeInfo);
            insertAfter(element, placeholderComment);
            // console.log("renderElement placeholderComment:", placeholder, placeholder.parentNode, placeholderComment, exists);
            for(const ele of exists)
            {
                // console.log(">>>>>>>>>>>>>>>>>>>>>>>> removeNode:", placeholder, ele != placeholderComment, ele.parentNode, ele);
                if(ele != placeholderComment)
                    removeNode(ele);
            }
        }
        else
        {
            let prev = element;
            for(const ele of renderElements)
            {
                insertAfter(prev, ele);
                prev = ele;
            }
            
            for(const ele of exists)
            {
                if(renderElements.indexOf(ele as Element) < 0)
                    removeNode(ele);
            }
        }
    }
    private processElementDirectiveRender(element: Element, renderInfo: ElementRenderInfo, directiveIndex: number) : Element[]
    {
        const directives = renderInfo.nodeInfo.directives;
        
        if(directiveIndex < directives.length)
        {
            return directives[directiveIndex].render(
                element,
                renderInfo, 
                (ele: Element, ri: ElementRenderInfo) => this.processElementDirectiveRender(ele, ri, directiveIndex+1)
            );
        }
        
        this.setRenderInfo(element, renderInfo);
        return [element];
    }
    public isPlaceholder(node: Node) : boolean
    {
        if(node.nodeType != 8) //8: Node.COMMENT_NODE
            return false;
        
        const info = this.getRenderInfo(node) as PlaceholderRenderInfo;
        return !!info && !!info.isPlaceholder;
    }
    private getPlaceholderComment(info: NodeElementInfo) : Comment
    {
        const placeholderComment = this.doc.createComment("_LiveDomId="+info.id);
        const renderInfo: PlaceholderRenderInfo = {nodeInfo: info, isPlaceholder: true};
        this.setNodeInfo(placeholderComment, info);
        this.setRenderInfo(placeholderComment, renderInfo);
        return placeholderComment;
    }
    public renderChildNodes(parentNode: Node) //TODO move to DirectiveElementChildNodes
    {
        const t = nextId ++;
        const nodes = [];
        const l = parentNode.childNodes.length;
        for(let i=0; i<l; ++i)
            nodes.push(parentNode.childNodes[i]);
        
        for(let i=0; i<l; ++i)
        {
            const node = nodes[i];
            const info = this.getNodeInfo(node);
            if(!info)
            {
                if(node.nodeType == 1) // 1: Node.ELEMENT_NODE
                    this.renderChildNodes(node);
                continue;
            }
            
            if(info._t == t)
                continue;
            
            info.render(node);
            info._t = t;
        }
    }
    
    private setupText(text: Text)
    {
        const parseResult = Parser.parseText(text.data);
        // console.log("buildNode parseText:", parseResult, parseResult.exec({}));
        if(!Parser.hasTextExpress(parseResult))
            return ;
        
        const info: NodeTextInfo = {
            id: 'LDT'+(nextId++),
        };
        const textExec = parseResult.exec;
        
        // console.log("buildNode:", info, text);
        info.render = (node: Text) =>
        {
            node.data = textExec(this.dataManager.data);
        }
        this.setNodeInfo(text, info);
        // info.render(text);
    }
    
    public cloneNode<N extends Node>(src: N): N
    {
        const des = src.cloneNode(true);
        this.cloneNodesInfo([src], [des]);
        return des as N;
    }
    private cloneNodesInfo(srcNodes: Node[]|NodeListOf<ChildNode>, desNodes: Node[]|NodeListOf<ChildNode>)
    {
        for(let i=0, l=srcNodes.length; i < l; ++i)
        {
            desNodes[i][propNodeInfo] = srcNodes[i][propNodeInfo];
            
            if(srcNodes[i].nodeType == 1) // 1: Node.ELEMENT_NODE
                this.cloneNodesInfo(srcNodes[i].childNodes, desNodes[i].childNodes);
        }
    }
    
    private setNodeInfo(node: Node, info: NodeInfo)
    {
        //weak map ?
        //prop map ?
        node[propNodeInfo] = info;
    }
    public getNodeInfo(node: Node) : NodeInfo
    {
        return node[propNodeInfo] || null;
    }
    private hasNodeInfo(node: Node) : boolean
    {
        return !!node[propNodeInfo];
    }
    
    private setRenderInfo(node: Node, info: RenderInfo)
    {
        //weak map ?
        //prop map ?
        node[propRenderInfo] = info;
    }
    public getRenderInfo(node: Node) : RenderInfo
    {
        return node[propRenderInfo] || null;
    }
    private hasRenderInfo(node: Node) : boolean
    {
        return !!node[propRenderInfo];
    }
    
    private isLiveNode(node: Node) : boolean
    {
        return propNodeInfo in node; //TODO use renderInfo
    }
}

interface PlaceholderRenderInfo extends RenderInfo
{
    isPlaceholder: boolean;
}

function removeNode(node: Node)
{
    if(node.parentNode)
        node.parentNode.removeChild(node);
}

function insertAfter(before: Node, node: Node)
{
    // console.log("insertAfter:", before, node, before==node, !!before.nextSibling, !!node.parentNode);
    if(before == node)
        return ;
    else if(before.nextSibling)
        before.parentNode.insertBefore(node, before.nextSibling);
    else
        before.parentNode.appendChild(node);
}

function wait(ms: number) : Promise<void>
{
    return new Promise(function(resolve)
    {
        setTimeout(resolve, ms);
    });
}

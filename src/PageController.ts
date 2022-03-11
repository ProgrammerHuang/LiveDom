import { MapObject, TypeData, TextFunction } from "./LiveDom";
import { DomScanner } from "./DomScanner";
import { DomScannerLoaded } from "./DomScannerLoaded";
import { Page, PageOptions } from "./Page";
import { Directive, DirectiveConfig } from "./Directive";
import { DirectiveElementRender } from "./DirectiveElementRender";
import { DirectiveElementEach } from "./DirectiveElementEach";
import { DataManager } from "./DataManager";
import { DirectiveElementIf } from "./DirectiveElementIf";
import { Parser } from "./Parser";
import { AttrInfo, ElementRenderInfo, NodeElementInfo, NodeInfo, NodeTextInfo } from "./NodeInfo";

// 1. scan and observe
// 2. build
// 3. render


// <!--\ld...--><!--/ld-->
// <tag live-dom="id1234"></tag>
// <tag _ld="id1234"></tag>
// <!--_ld=id1234-->

// .toRawHtml()

// WeakMap<Document, Map<NodeInfo>>

const propLiveInfo = Symbol("LiveDomInfoProp");
const attrLiveName = "_ld";
const attrLiveEach = "live:each";
const attrLiveIf = "live:if";
const attrLiveElse = "live:else";
let nextId = 1001;

export class PageController
{
    public doc: Document;
    public options: PageOptions;
    public page: Page;
    // public container: Element;
    public dataManager: DataManager;
    
    private scanner: DomScanner;
    private elementDirectivesConfig: DirectiveConfig[];
    // private directiveText: DirectiveText;
    private nodeInfos: MapObject<NodeInfo>;
    
    public constructor(doc: Document, options: PageOptions)
    {
        this.doc = doc;
        this.options = options;
        this.dataManager = new DataManager(options.data || {});
        this.elementDirectivesConfig = [
            {attr: attrLiveEach, create: DirectiveElementEach.create, },
            {attr: attrLiveIf, create: DirectiveElementIf.create, },
            {attr: null, create: DirectiveElementRender.create, },
        ];
        // this.directiveText = new DirectiveText();
        this.nodeInfos = {};
        
        this.scanner = new DomScannerLoaded(document, {
            elementStart: this.scanElementStart.bind(this),
            elementEnd: this.scanElementEnd.bind(this),
            comment: this.scanComment.bind(this),
            text: this.scanText.bind(this),
            completed: this.scanCompleted.bind(this),
        });
        this.scanner.scan();
        
        // this.container = options.container as Element;
        // this.page = new Page(this.container);
        this.initPage();
        
        // this.getNodeInfo(this.container).render(this.data);
    }
    
    private initPage()
    {
        this.page = new Page();
        this.page.updateData = this.updatePageData.bind(this);
    }
    private updatePageData(data: TypeData = {}) : Promise<void>
    {
        // console.log("updatePageData:", data);
        this.dataManager.mergePageData(data);
        this.renderElement(this.doc.documentElement);
        return Promise.resolve();
    }
    
    public parse()
    {
        return this.scanner.scan();
    }
    
    private scanElementStart(element: Element) : void
    {
        // init element
        // console.log("elementStart:", element);
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
        
        this.setupText(text);
    }
    private scanCompleted() : void
    {
        this.renderElement(this.doc.documentElement);
    }
    
    private setupElement(element: Element)
    {
        const info: NodeElementInfo = {
            id: 'LDE'+(nextId++),
            element,
            placeholderComment: null,
            attrs: {},
            directives: [],
            directiveAttrs: {},
        };
        
        // console.log("DirectiveElement build node:", nodeInfo, node);
        //TODO find directive attributes and remove, then for each attributes
        const attrs = element.attributes;
        for(let i=attrs.length-1; i>=0; --i)
        {
            const attr = attrs[i];
            const attrInfo = this.setupAttribute(attr);
            // console.log("initElement attribute:", attr, attrInfo);
            if(attrInfo)
            {
                info.attrs[attr.name] = attrInfo;
                // attr.value = attrInfo.exec(this.data);
            }
        }
        
        this.setupElementDirectives(element, info);
        
        if(Object.keys(info.attrs).length == 0 && Object.keys(info.directives).length == 0 && Object.keys(info.directiveAttrs).length == 0)
        {
            this.setNodeInfo(element, null);
            return ;
        }
        
        info.render = this.renderElement.bind(this);
        this.setNodeInfo(element, info);
    }
    private setupElementDirectives(element: Element, info: NodeElementInfo)
    {
        for(const config of this.elementDirectivesConfig)
        {
            const directive = config.create(this, element, info, config);
            if(directive)
                info.directives.push(directive);
        }
    }
    private setupAttribute(attr: Attr) : AttrInfo
    {
        const parseResult = Parser.parseText(attr.value);
        if(!Parser.hasTextExpress(parseResult))
            return null;
        
        return {
            exec: parseResult.exec,
        };
    }
    private renderElement(placeholder: Element)
    {
        const elementInfo = this.getNodeInfo(placeholder) as NodeElementInfo;
        // const element = placeholder.nodeType==1 ? placeholder as Element : elementInfo.element;
        // console.log("renderElement:", placeholder, this.isLiveNode(placeholder), elementInfo);
        if(! elementInfo)
        {
            this.renderChildNodes(placeholder);
            return ;
        }
        
        const exists: Node[] = [placeholder];
        let nextNode = placeholder.nextSibling;
        while(nextNode)
        {
            const nextInfo = this.getNodeInfo(nextNode);
            if(nextInfo != elementInfo)
                break;
            
            exists.push(nextNode);
            nextNode = nextNode.nextSibling;
        }
        
        const renderInfo: ElementRenderInfo = {
            elementInfo,
            exists,
            renders: [], //TODO no use
            attrsVal: {}, //TODO no use
            directivesVal: {},
        };
        
        const element = placeholder.nodeType==1 ? placeholder as Element : elementInfo.element;
        // const renderElements = this.processElementRender(element, renderInfo);
        const renderElements = this.processElementDirectiveRender(element, renderInfo, 0);
        // console.log("renderElement renderElements:", element, renderElements, renderInfo);
        if(renderElements.length == 0)
        {
            // console.log("renderElement renderElements remove:", exists.length, element.parentNode, element);
            const placeholderComment = this.getPlaceholderComment(elementInfo);
            insertAfter(placeholder, placeholderComment);
            for(const ele of exists)
            {
                // console.log(">>>>>>>>>>>>>>>>>>>>>>>>", ele.parentNode, ele);
                if(ele != placeholderComment)
                    removeNode(ele);
            }
        }
        else
        {
            let prev = placeholder;
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
        const directives = renderInfo.elementInfo.directives;
        
        if(directiveIndex < directives.length)
        {
            return directives[directiveIndex].render(
                element,
                renderInfo, 
                (ele: Element, info: ElementRenderInfo) => this.processElementDirectiveRender(ele, info, directiveIndex+1)
            );
        }
        
        return [element];
    }
    private getPlaceholderComment(info: NodeElementInfo) : Comment
    {
        if(info.placeholderComment)
            return info.placeholderComment;
        
        info.placeholderComment = this.doc.createComment("_LiveDomId="+info.id);
        this.setNodeInfo(info.placeholderComment, info);
        return info.placeholderComment;
    }
    public renderChildNodes(parentNode: Node)
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
        
        // console.log("buildNode:", info, text);
        info.render = (node: Text) =>
        {
            node.data = parseResult.exec(this.dataManager.data);
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
            desNodes[i][propLiveInfo] = srcNodes[i][propLiveInfo];
            
            if(srcNodes[i].nodeType == 1) // 1: Node.ELEMENT_NODE
                this.cloneNodesInfo(srcNodes[i].childNodes, desNodes[i].childNodes);
        }
    }
    
    private setNodeInfo(node: Node, info: NodeInfo)
    {
        //weak map ?
        //prop map ?
        node[propLiveInfo] = info;
    }
    private getNodeInfo(node: Node) : NodeInfo
    {
        return node[propLiveInfo] || null;
    }
    private hasNodeInfo(node: Node) : boolean
    {
        return !!node[propLiveInfo];
    }
    private isLiveNode(node: Node) : boolean
    {
        return propLiveInfo in node;
    }
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


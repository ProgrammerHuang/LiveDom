import { DomScanner, DomScannerOptions } from "./DomScanner";

export class DomScannerStream extends DomScanner
{
    private incompleteNodes: Node[];
    private scanPromise: Promise<void> = null;
    private scanResolve: () => void = null;
    
    public constructor(doc: Document, options: DomScannerOptions)
    {
        super(doc, options);
        
        this.incompleteNodes = [];
    }

    public scan(): Promise<void>
    {
        if (this.scanPromise)
            return this.scanPromise;
        
        this.scanPromise = new Promise((resolve, reject) =>
        {
            this.scanResolve = resolve;
        });
        
        this.walkNode(this.doc.documentElement);
        this.startObserve();
        
        if (this.incompleteNodes.length > 0)
            setTimeout(this.scanIncompleteNodes.bind(this), 50);
    }
    
    private scanIncompleteNodes()
    {
        const incompleteNodes = this.incompleteNodes;
        // console.log("scanIncompleteNodes:", incompleteNodes);
        
        let lastCompletedNode: Node = null;
        
        while (incompleteNodes.length > 0 && this.isCompletedNode(incompleteNodes[incompleteNodes.length - 1]))
            lastCompletedNode = this.incompleteNodes.pop();
        
        if (lastCompletedNode)
            this.walkNode(lastCompletedNode);
        
        if (this.incompleteNodes.length > 0)
        {
            setTimeout(this.scanIncompleteNodes.bind(this), 50);
        }
        else
        {
            // this.options.completed();
            this.scanResolve();
        }
    }
    
    protected walkNode(node: Node)
    {
        // console.log("walk node:", node, this.isCompletedNode(node));
        switch (node.nodeType)
        {
            case 1: //ELEMENT_NODE
                this.processElement(node as Element);
                break;
            case 3: //TEXT_NODE
                this.processText(node as Text);
                break;
            // case 4: //CDATA_SECTION_NODE
            //     if(childInfo = initText(controller, node as Text))
            //     {
            //         info.watch = info.watch.concat(childInfo.watch);
            //     }
            //     break;
            case 8: //COMMENT_NODE
                this.processComment(node as Comment);
                break;
            // default : //Not support type
            //     break;
        }
    }
    
    protected processElement(element: Element)
    {
        // console.log("process element:", element);
        if (this.ignoreElementTags[element.tagName.toLowerCase()])
            return;
        
        // if(this.incompleteNodes.indexOf(element) < 0)
        this.processElementStart(element);
        
        const isCompleted = this.isCompletedNode(element);
        if (!isCompleted)
            this.incompleteNodes.push(element);
        
        this.processChildNodes(element);
        
        if (isCompleted)
            this.processElementEnd(element);
    }
    
    protected processChildNodes(element: Element)
    {
        element.childNodes.forEach((node: Node) =>
        {
            this.walkNode(node);
        });
    }

    protected processElementStart(element: Element)
    {
        // console.log("processElementStart:", element);
        this.options.elementStart(element);
    }
    protected processElementEnd(element: Element)
    {
        // console.log("processElementEnd:", element);
        this.options.elementEnd(element);
    }
    protected processComment(node: Comment)
    {
        // console.log("processComment:", node);
        if (!this.isCompletedNode(node))
        {
            this.incompleteNodes.push(node);
            return;
        }
        
        this.options.comment(node);
    }
    protected processText(node: Text)
    {
        // console.log("processText:", node);
        if (!this.isCompletedNode(node))
        {
            this.incompleteNodes.push(node);
            return;
        }
        
        this.options.text(node);
    }

    private isCompletedNode(node: Node): boolean
    {
        if (this.doc.readyState == "complete")
            return true;
        
        if (node.nextSibling)
            return true;
        
        return node.parentNode ? this.isCompletedNode(node.parentNode) : false;
    }
}

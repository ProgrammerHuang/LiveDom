

export interface DomScannerOptions
{
    elementStart(element: Element): void;
    elementEnd(element: Element): void;
    comment(comment: Comment): void;
    text(text: Text): void;
    attrChanged(element: Element, attrName: string): void;
    // elementAdd(element: Element): void;
}

export abstract class DomScanner
{
    protected doc: Document;
    protected observer: MutationObserver;
    protected options: DomScannerOptions;
    protected ignoreElementTags = {script: true, style: true};

    public constructor(doc: Document, options: DomScannerOptions)
    {
        this.options = options;
        this.doc = doc;
        this.observer = new MutationObserver(this.mutationObserverCallback.bind(this));
    }
    
    public abstract scan(): Promise<void>;
    protected abstract walkNode(node: Node) : void;
    
    protected startObserve()
    {
        const options: MutationObserverInit = {
            subtree: true,
            childList: true,
            attributes: true,
            // characterData: true,
        };
        this.observer.observe(this.doc.documentElement, options);
    }
    private mutationObserverCallback(records: MutationRecord[])
    {
        // console.log("mutationObserverCallback:", records);
        //TODO setup
        //TODO notify parents update, and rerender
        // updateAttr|Element|Text
        let addedNodes = [];
        for(const record of records)
        {
            // record.addedNodes.forEach((node) =>
            // {
            //     console.log("mutationObserver addedNode:", node);
            //     if(addedNodes.indexOf(node) < 0)
            //         addedNodes.push(node);
            //     else
            //         console.log("mutationObserver addedNode duplicated:", node);
            // });
            // continue;
            
            // console.log("mutationObserver", record.type, record.target, record.addedNodes, record.removedNodes);
            switch(record.type)
            {
            // case "characterData": //don't observe
            //     // if(record.target.nodeType == 3) //TEXT_NODE
            //         this.options.textChanged(record.target as Text);
            //     break;
                
            case "attributes":
                // console.log("mutationObserver attributes:", record.attributeName, record.target);
                this.options.attrChanged(record.target as Element, record.attributeName);
                break;
                
            case "childList":
                // TODO scan inside
                record.addedNodes.forEach((node) =>
                {
                    this.walkNode(node);
                });
                break;
                
            }
        }
    }
}

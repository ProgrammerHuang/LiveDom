import { DomScanner } from "./DomScanner";

export class DomScannerLoaded extends DomScanner
{
    protected scanPromise: Promise<void> = null;

    public scan(): Promise<void>
    {
        if (this.scanPromise)
            return this.scanPromise;

        return this.scanPromise = new Promise<void>((resolve, reject) =>
        {
            if (this.doc.readyState == "complete")
            {
                this.walkNode(this.doc.documentElement);
                this.options.completed();
                this.observer.observe(this.doc.documentElement, { subtree: true, childList: true, attributes: true, characterData: true });
                resolve();
            }

            else
            {
                this.doc.addEventListener("DOMContentLoaded", () =>
                {
                    this.walkNode(this.doc.documentElement);
                    this.options.completed();
                    this.observer.observe(this.doc.documentElement, { subtree: true, childList: true, attributes: true, characterData: true });
                    resolve();
                });
            }
        });
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

        element.childNodes.forEach((node: Node) =>
        {
            this.walkNode(node);
        });

        this.processElementEnd(element);
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
        this.options.comment(node);
    }
    protected processText(node: Text)
    {
        // console.log("processText:", node);
        this.options.text(node);
    }
}

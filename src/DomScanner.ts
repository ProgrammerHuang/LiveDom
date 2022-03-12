

export interface DomScannerOptions
{
    elementStart(element: Element): void;
    elementEnd(element: Element): void;
    comment(comment: Comment): void;
    text(text: Text): void;
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

    private mutationObserverCallback(mutationList: MutationRecord[])
    {
        // console.log("mutationObserverCallback:", mutationList);
        // push into loading queue
    }
}

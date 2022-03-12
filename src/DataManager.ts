
export type TypeData = {[k: string]: any};

export class DataManager
{
    public data: TypeData;
    public initData: TypeData;
    public pageData: TypeData;
    private scopeDataStack: TypeData[];

    public constructor(initData: TypeData)
    {
        this.initData = initData;
        this.pageData = Object.create(this.initData);

        this.scopeDataStack = [];

        this.data = Object.create(this.pageData);
    }

    public mergePageData(pageData: TypeData)
    {
        Object.assign(this.pageData, pageData);
    }

    public pushScopeData(scopeData: TypeData)
    {
        this.scopeDataStack.push(scopeData);
        this.data = Object.create(this.data);
        Object.assign(this.data, scopeData);
    }
    public popScopeData(scopeData: TypeData)
    {
        if (this.scopeDataStack[this.scopeDataStack.length - 1] != scopeData)
            throw new Error("popScopeData fail! scopeData not last data.");

        this.scopeDataStack.pop();
        this.data = Object.getPrototypeOf(this.data);
    }
}


export type TypeData = {[k: string]: any};
export type DataPaths = {[path: string]: string[]};

export class DataManager
{
    public data: TypeData;
    public topData: TypeData;
    public pageData: TypeData;
    public lastMergeData: TypeData;
    private scopeDataStack: TypeData[];
    
    public constructor(initData: TypeData)
    {
        this.topData = {};
        this.scopeDataStack = [];
        this.lastMergeData = {};
        
        this.pageData = Object.create(this.topData);
        this.data = Object.create(this.pageData);
        
        this.mergePageData(initData);
    }
    
    public mergePageData(pageData: TypeData)
    {
        Object.assign(this.lastMergeData, pageData);
        Object.assign(this.pageData, pageData);
    }
    public commitMergeData() //like transaction commit
    {
        this.lastMergeData = {};
    }
    public hasUseLastMergeData(paths: DataPaths): boolean
    {
        for(const p in paths)
        {
            if(paths[p][0] in this.lastMergeData)
                return true;
        }
        
        return false;
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

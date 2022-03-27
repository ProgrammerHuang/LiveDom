import { TypeData } from "./DataManager";
import { PageController } from "./PageController";

 //TODO singleton for page, and life in doc

export interface PageOptions
{
    // container?: Element|string;
    data?: TypeData; //init data
    // directives?: MapObject<DirectiveOptions>;
    onPageSetupCompleted?: ()=>void;
    // debug?: boolean;
}

export function createPage(controller: PageController) : Page
{
    const page = new Page();
    
    page.updateData = controller.updatePageData.bind(controller);
    
    return page;
}

export class Page
{
    public updateData: (data: TypeData) => Promise<void>;
    // public onReady: (callback: ()=>void) => void;
}


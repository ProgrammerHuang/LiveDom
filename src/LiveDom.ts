import { Page, PageOptions } from "./Page";
import { PageController } from "./PageController";


export type MapObject<T=any> = {[k: string]: T};
export type TypeData = {[k: string]: any};
export type TextFunction<R=any> = (data: TypeData) => R;
export type RendererFunction<R=any> = (node: Node) => R;

export default class LiveDom
{
    public static init(options: PageOptions = {}) : Promise<Page>
    {
        const controller = new PageController(document, options); //TODO singleton for page, and life in doc
        
        return controller.parse().then(() => controller.page);
    }
}


import { createPage, Page, PageOptions } from "./Page";
import { PageController } from "./PageController";

export default class LiveDom
{
    public static initPage(options: PageOptions = {}) : Page
    {
        const controller = new PageController(document, options);
        return createPage(controller);
    }
}


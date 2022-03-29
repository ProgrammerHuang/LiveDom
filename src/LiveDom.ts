import { DirectiveDisableChildNodes } from "./DirectiveDisableChildNodes";
import { DirectiveElementEach } from "./DirectiveElementEach";
import { DirectiveElementElse } from "./DirectiveElementElse";
import { DirectiveElementIf } from "./DirectiveElementIf";
import { DirectiveElementInnerHtml } from "./DirectiveElementInnerHtml";
import { DirectiveElementInnerText } from "./DirectiveElementInnerText";
import { DirectiveElementRender } from "./DirectiveElementRender";
import { DirectiveHtmlInputRender } from "./DirectiveHtmlInputRender";
import { DirectiveHtmlTemplate } from "./DirectiveHtmlTemplate";
import { createPage, Page, PageOptions } from "./Page";
import { PageController } from "./PageController";

export default class LiveDom
{
    public static initPage(options: PageOptions = {}) : Page
    {
        const controllerOptions = {
            ...options,
            elementDirectivesConfig: [
                {attr: "live:each", setup: DirectiveElementEach.setup, },
                {attr: "live:if", setup: DirectiveElementIf.setup, },
                {attr: "live:else", setup: DirectiveElementElse.setup, },
                {attr: null, setup: DirectiveHtmlInputRender.setup, },
                {attr: "live:html", setup: DirectiveElementInnerHtml.setup, },
                {attr: "live:text", setup: DirectiveElementInnerText.setup, },
                {attr: "live:template", setup: DirectiveHtmlTemplate.setup, },
                {attr: "live:disable-children", setup: DirectiveDisableChildNodes.setup, },
                {attr: null, setup: DirectiveElementRender.setup, }, //must last one
            ]
        };
        const controller = new PageController(document, controllerOptions);
        return createPage(controller);
    }
}


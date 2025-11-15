import {inject} from "inversify";
import * as zod from "zod";
import {dependencies} from "../dependencies.js";
import {generatePageName} from "../modules/playwright/utils.js";
import type {CallToolResult} from "@modelcontextprotocol/sdk/types.js";
import type {Tool as ToolInterface} from "../modules/mcp/types.js";
import type {PageService as PageServiceInterface, Context as ContextInterface} from "../modules/playwright/types.js";
import {tool} from "../decorators/tool.js";

@tool()
export class NavigatePage implements ToolInterface {
    readonly name = "navigate-page";
    readonly description = "Navigate the current page to a different URL, or open a new page if none exists";
    readonly schema = zod.object({
        url: zod.string().describe("URL to navigate to"),
    }).shape;

    constructor(
        @inject(dependencies.PageService) private pageService: PageServiceInterface
    ) {}

    async handler({ url }: { url: string }, _context: ContextInterface): Promise<CallToolResult> {
        try {
            let page = this.pageService.getCurrentPage();

            if (!page) {
                const pageName = generatePageName();
                page = await this.pageService.getNewPage(pageName);
            }

            await page.goto(url);

            const title = await page.title();
            const pageUrl = page.url();

            return {
                content: [
                    {
                        type: "text",
                        text: `Successfully navigated to:\nTitle: ${title}\nURL: ${pageUrl}`,
                    },
                ],
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error navigating to "${url}": ${error instanceof Error ? error.message : String(error)}`,
                    },
                ],
            };
        }
    }
}

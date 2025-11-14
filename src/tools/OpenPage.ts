import {inject} from "inversify";
import * as zod from "zod";
import {dependencies} from "../dependencies.js";
import {uniqueNamesGenerator, adjectives, colors, animals} from "unique-names-generator";
import type {CallToolResult} from "@modelcontextprotocol/sdk/types.js";
import type {Tool as ToolInterface} from "../modules/mcp/types.js";
import type {PageService as PageServiceInterface, Context as ContextInterface} from "../modules/playwright/types.js";
import {tool} from "../decorators/tool.js";

@tool()
export class OpenPage implements ToolInterface {
    readonly name = "open-web-page";
    readonly description = "Open a web page in a browser";
    readonly schema = zod.object({
        url: zod.string().describe("URL of the web page to open"),
    }).shape;

    constructor(
        @inject(dependencies.PageService) private pageService: PageServiceInterface
    ) {}

    async handler({ url }: { url: string }, _context: ContextInterface): Promise<CallToolResult> {
        try {
            const pageName = uniqueNamesGenerator({
                dictionaries: [adjectives, colors, animals],
                separator: '-',
                length: 3,
                style: 'lowerCase'
            });
            const page = await this.pageService.getNewPage(pageName);

            await page.goto(url);

            const title = await page.title();
            const pageUrl = page.url();

            return {
                content: [
                    {
                        type: "text",
                        text: `Successfully opened webpage:\nPage Name: ${pageName}\nTitle: ${title}\nURL: ${pageUrl}`,
                    },
                ],
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error opening webpage "${url}": ${error instanceof Error ? error.message : String(error)}`,
                    },
                ],
            };
        }
    }
}

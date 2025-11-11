import {inject} from "inversify";
import {dependencies} from "../dependencies.js";
import {uniqueNamesGenerator, adjectives, colors, animals} from "unique-names-generator";
import {OpenWebPageSchema} from "../schemas.js";
import type {CallToolResult} from "@modelcontextprotocol/sdk/types.js";
import type {Tool as ToolInterface} from "../modules/mcp/types.js";
import type {BrowserService as BrowserServiceInterface, Context as ContextInterface} from "../modules/playwright/types.js";
import {tool} from "../decorators/tool.js";

@tool()
export class OpenPage implements ToolInterface {
    readonly name = "open-web-page";
    readonly description = "Open a web page in a browser";
    readonly schema = OpenWebPageSchema.shape;

    constructor(
        @inject(dependencies.BrowserService) private browserService: BrowserServiceInterface
    ) {}

    async handler({ url }: { url: string }, context: ContextInterface): Promise<CallToolResult> {
        try {
            const browser = await this.browserService.getBrowser();

            const browserContext = await browser.newContext();
            const page = await browserContext.newPage();

            const pageName = uniqueNamesGenerator({
                dictionaries: [adjectives, colors, animals],
                separator: '-',
                length: 3,
                style: 'lowerCase'
            });
            context.addPage(pageName, page);

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

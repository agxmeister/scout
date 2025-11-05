import {injectable} from "inversify";
import {chromium} from "playwright";
import {OpenWebPageSchema} from "../schemas.js";
import type {CallToolResult} from "@modelcontextprotocol/sdk/types.js";
import type {Tool as ToolInterface, Context as ContextInterface} from "../modules/mcp/types.js";

@injectable()
export class OpenPage implements ToolInterface {
    readonly name = "open-web-page";
    readonly description = "Open a web page in a browser";
    readonly schema = OpenWebPageSchema.shape;

    async handler({ url }: { url: string }, context: ContextInterface): Promise<CallToolResult> {
        try {
            if (!context.browser) {
                const browser = await chromium.launch({
                    headless: false,
                });
                context.setBrowser(browser);
            }

            const browserContext = await context.browser!.newContext();
            const page = await browserContext.newPage();

            const pageName = `page-${Math.random().toString(36).substring(2, 9)}`;
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

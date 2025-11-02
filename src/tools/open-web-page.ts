import {chromium, Browser} from "playwright";
import {OpenWebPageSchema} from "../schemas.js";
import type {CallToolResult} from "@modelcontextprotocol/sdk/types.js";

export const openWebPageTool = {
    name: "open-web-page",
    description: "Open a web page in a browser",
    schema: OpenWebPageSchema.shape,
    handler: async ({ url }: { url: string }, context: { browser: Browser | null, setBrowser: (b: Browser) => void, setCurrentPage: (p: any) => void }): Promise<CallToolResult> => {
        try {
            if (!context.browser) {
                const browser = await chromium.launch({
                    headless: false,
                });
                context.setBrowser(browser);
            }

            const browserContext = await context.browser!.newContext();
            const currentPage = await browserContext.newPage();
            context.setCurrentPage(currentPage);

            await currentPage.goto(url);

            const title = await currentPage.title();
            const pageUrl = currentPage.url();

            return {
                content: [
                    {
                        type: "text",
                        text: `Successfully opened webpage:\nTitle: ${title}\nURL: ${pageUrl}`,
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
    },
};

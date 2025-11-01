import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import {StdioServerTransport} from "@modelcontextprotocol/sdk/server/stdio.js";
import {chromium, Browser} from "playwright";
import {EchoSchema, OpenWebPageSchema, ClickCoordinatesSchema} from "./schemas.js";

const server = new McpServer({
    name: "scout",
    version: "1.0.0",
});

let browser: Browser | null = null;
let currentPage: any = null;

server.tool("echo", "Echo back the input", EchoSchema.shape, async ({ message }) => {
    return {
        content: [
            {
                type: "text",
                text: `Echo: ${message}`,
            },
        ],
    };
});

server.tool("open-web-page", "Open a web page in a browser", OpenWebPageSchema.shape, async ({ url }) => {
    try {
        if (!browser) {
            browser = await chromium.launch({
                headless: false,
            });
        }

        const context = await browser.newContext();
        currentPage = await context.newPage();

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
});

server.tool("click-coordinates", "Click at specified coordinates on the current page", ClickCoordinatesSchema.shape, async ({ x, y }) => {
    try {
        if (!currentPage) {
            return {
                content: [
                    {
                        type: "text",
                        text: "Error: No page is currently open. Please open a webpage first using the open-web-page tool.",
                    },
                ],
            };
        }

        await currentPage.mouse.click(x, y);

        return {
            content: [
                {
                    type: "text",
                    text: `Successfully clicked at coordinates (${x}, ${y})`,
                },
            ],
        };
    } catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: `Error clicking at coordinates (${x}, ${y}): ${error instanceof Error ? error.message : String(error)}`,
                },
            ],
        };
    }
});

(async () => {
    const transport = new StdioServerTransport();
    await server.connect(transport);
})();

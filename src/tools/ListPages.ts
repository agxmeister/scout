import * as zod from "zod";
import type {CallToolResult} from "@modelcontextprotocol/sdk/types.js";
import type {Tool as ToolInterface} from "../modules/mcp/types.js";
import type {Context as ContextInterface} from "../modules/playwright/types.js";
import {tool} from "../decorators/tool.js";

@tool()
export class ListPages implements ToolInterface {
    readonly name = "list-pages";
    readonly description = "List all open pages with their names, titles, and URLs";
    readonly schema = zod.object({}).shape;

    async handler(_params: any, context: ContextInterface): Promise<CallToolResult> {
        try {
            if (!context.browser) {
                return {
                    content: [
                        {
                            type: "text",
                            text: "No browser is open. Please open a browser first.",
                        },
                    ],
                };
            }

            const pageNames = Array.from(context.pages.keys());

            if (pageNames.length === 0) {
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({ pages: [] }, null, 2),
                        },
                    ],
                };
            }

            const pageInfoPromises = pageNames.map(async (name) => {
                const page = context.pages.get(name)!;
                const title = await page.title();
                const url = page.url();
                const isCurrent = context.currentPage === page;
                return { name, title, url, isCurrent };
            });

            const pages = await Promise.all(pageInfoPromises);

            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify({ pages }, null, 2),
                    },
                ],
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error listing pages: ${error instanceof Error ? error.message : String(error)}`,
                    },
                ],
            };
        }
    }
}

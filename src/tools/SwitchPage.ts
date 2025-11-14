import * as zod from "zod";
import type {CallToolResult} from "@modelcontextprotocol/sdk/types.js";
import type {Tool as ToolInterface} from "../modules/mcp/types.js";
import type {Context as ContextInterface} from "../modules/playwright/types.js";
import {tool} from "../decorators/tool.js";

@tool()
export class SwitchPage implements ToolInterface {
    readonly name = "switch-page";
    readonly description = "Switch to a different open page by name";
    readonly schema = zod.object({
        name: zod.string().describe("Name of the page to switch to"),
    }).shape;

    async handler({ name }: { name: string }, context: ContextInterface): Promise<CallToolResult> {
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

            const availablePages = Array.from(context.pages.keys());
            if (!context.pages.has(name)) {
                return {
                    content: [
                        {
                            type: "text",
                            text: `Page "${name}" not found. Available pages: ${availablePages.join(", ")}`,
                        },
                    ],
                };
            }

            context.setCurrentPage(name);
            const page = context.pages.get(name)!;
            const title = await page.title();
            const url = page.url();

            return {
                content: [
                    {
                        type: "text",
                        text: `Switched to page "${name}":\nTitle: ${title}\nURL: ${url}`,
                    },
                ],
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error switching to page "${name}": ${error instanceof Error ? error.message : String(error)}`,
                    },
                ],
            };
        }
    }
}

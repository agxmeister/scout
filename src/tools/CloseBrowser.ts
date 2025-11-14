import * as zod from "zod";
import type {CallToolResult} from "@modelcontextprotocol/sdk/types.js";
import type {Tool as ToolInterface} from "../modules/mcp/types.js";
import type {Context as ContextInterface} from "../modules/playwright/types.js";
import {tool} from "../decorators/tool.js";

@tool()
export class CloseBrowser implements ToolInterface {
    readonly name = "close-browser";
    readonly description = "Close the browser and clean up resources";
    readonly schema = zod.object({}).shape;

    async handler(_params: any, context: ContextInterface): Promise<CallToolResult> {
        try {
            if (context.browser) {
                await context.browser.close();
                context.browser = null;
                context.clearPages();
            }
            return {
                content: [
                    {
                        type: "text",
                        text: "Browser closed successfully",
                    },
                ],
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error closing browser: ${error instanceof Error ? error.message : String(error)}`,
                    },
                ],
            };
        }
    }
}

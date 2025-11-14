import * as zod from "zod";
import type {CallToolResult} from "@modelcontextprotocol/sdk/types.js";
import type {Tool as ToolInterface} from "../modules/mcp/types.js";
import type {Context as ContextInterface} from "../modules/playwright/types.js";
import {tool} from "../decorators/tool.js";

@tool()
export class Click implements ToolInterface {
    readonly name = "click-coordinates";
    readonly description = "Click at specified coordinates on the current page";
    readonly schema = zod.object({
        x: zod.number().describe("X coordinate to click"),
        y: zod.number().describe("Y coordinate to click"),
    }).shape;

    async handler({ x, y }: { x: number, y: number }, context: ContextInterface): Promise<CallToolResult> {
        try {
            if (!context.currentPage) {
                return {
                    content: [
                        {
                            type: "text",
                            text: "Error: No page is currently open. Please open a webpage first using the open-web-page tool.",
                        },
                    ],
                };
            }

            await context.currentPage.mouse.click(x, y);

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
    }
}

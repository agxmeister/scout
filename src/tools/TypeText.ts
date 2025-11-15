import * as zod from "zod";
import type {CallToolResult} from "@modelcontextprotocol/sdk/types.js";
import type {Tool as ToolInterface} from "../modules/mcp/types.js";
import type {Context as ContextInterface} from "../modules/playwright/types.js";
import {tool} from "../decorators/tool.js";

@tool()
export class TypeText implements ToolInterface {
    readonly name = "type-text";
    readonly description = "Type text into an input field at specified coordinates";
    readonly schema = zod.object({
        x: zod.number().describe("X coordinate of the input field"),
        y: zod.number().describe("Y coordinate of the input field"),
        text: zod.string().describe("Text to type into the input field"),
    }).shape;

    async handler({ x, y, text }: { x: number; y: number; text: string }, context: ContextInterface): Promise<CallToolResult> {
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
            await context.currentPage.keyboard.type(text);

            return {
                content: [
                    {
                        type: "text",
                        text: `Successfully typed text at coordinates (${x}, ${y})`,
                    },
                ],
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error typing text at coordinates (${x}, ${y}): ${error instanceof Error ? error.message : String(error)}`,
                    },
                ],
            };
        }
    }
}

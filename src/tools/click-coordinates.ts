import {ClickCoordinatesSchema} from "../schemas.js";
import type {CallToolResult} from "@modelcontextprotocol/sdk/types.js";

export const clickCoordinatesTool = {
    name: "click-coordinates",
    description: "Click at specified coordinates on the current page",
    schema: ClickCoordinatesSchema.shape,
    handler: async ({ x, y }: { x: number, y: number }, context: { currentPage: any }): Promise<CallToolResult> => {
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
    },
};

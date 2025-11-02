import {ScreenshotSchema} from "../schemas.js";
import type {CallToolResult} from "@modelcontextprotocol/sdk/types.js";

export const screenshotTool = {
    name: "screenshot",
    description: "Take a screenshot of the current page",
    schema: ScreenshotSchema.shape,
    handler: async (_params: {}, context: { currentPage: any }): Promise<CallToolResult> => {
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

            const screenshot = await context.currentPage.screenshot();

            return {
                content: [
                    {
                        type: "image",
                        data: screenshot.toString("base64"),
                        mimeType: "image/png",
                    },
                ],
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error taking screenshot: ${error instanceof Error ? error.message : String(error)}`,
                    },
                ],
            };
        }
    },
};

import {injectable} from "inversify";
import {ScreenshotSchema} from "../schemas.js";
import type {CallToolResult} from "@modelcontextprotocol/sdk/types.js";
import type {Tool as ToolInterface, Context as ContextInterface} from "../modules/mcp/types.js";

@injectable()
export class TakeScreenshot implements ToolInterface {
    readonly name = "screenshot";
    readonly description = "Take a screenshot of the current page";
    readonly schema = ScreenshotSchema.shape;

    async handler(_params: {}, context: ContextInterface): Promise<CallToolResult> {
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
    }
}

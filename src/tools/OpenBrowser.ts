import {inject} from "inversify";
import {dependencies} from "../dependencies.js";
import {OpenBrowserSchema} from "../schemas.js";
import type {CallToolResult} from "@modelcontextprotocol/sdk/types.js";
import type {Tool as ToolInterface} from "../modules/mcp/types.js";
import type {BrowserService as BrowserServiceInterface, Context as ContextInterface} from "../modules/playwright/types.js";
import {tool} from "../decorators/tool.js";

@tool()
export class OpenBrowser implements ToolInterface {
    readonly name = "open-browser";
    readonly description = "Open a browser instance";
    readonly schema = OpenBrowserSchema.shape;

    constructor(
        @inject(dependencies.BrowserService) private browserService: BrowserServiceInterface
    ) {}

    async handler(_params: any, _context: ContextInterface): Promise<CallToolResult> {
        try {
            await this.browserService.getBrowser();
            return {
                content: [
                    {
                        type: "text",
                        text: "Browser opened successfully",
                    },
                ],
            };
        } catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error opening browser: ${error instanceof Error ? error.message : String(error)}`,
                    },
                ],
            };
        }
    }
}

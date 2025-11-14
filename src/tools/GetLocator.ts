import * as zod from "zod";
import type {CallToolResult} from "@modelcontextprotocol/sdk/types.js";
import type {Tool as ToolInterface} from "../modules/mcp/types.js";
import type {Context as ContextInterface} from "../modules/playwright/types.js";
import {tool} from "../decorators/tool.js";

@tool()
export class GetLocator implements ToolInterface {
    readonly name = "get-locator";
    readonly description = "Get XPath locator of an element at specified coordinates. Returns XPath using element's id or class attribute.";
    readonly schema = zod.object({
        x: zod.number().describe("X coordinate of the element"),
        y: zod.number().describe("Y coordinate of the element"),
    }).shape;

    async handler({ x, y }: { x: number, y: number }, context: ContextInterface): Promise<CallToolResult> {
        try {
            if (!context.currentPage) {
                return {
                    isError: true,
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({ error: "No page is currently open" }),
                        },
                    ],
                };
            }

            return await context.currentPage.evaluate(({ x, y }: { x: number, y: number }) => {
                const element = document.elementFromPoint(x, y);

                if (!element) {
                    return {
                        isError: true,
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify({ error: "No element found at specified coordinates" }),
                            },
                        ],
                    };
                }

                const elementId = element.id;
                const elementClass = element.className;

                if (!elementId && !elementClass) {
                    return {
                        isError: true,
                        content: [
                            {
                                type: "text",
                                text: JSON.stringify({ error: "Element has neither id nor class attribute" }),
                            },
                        ],
                    };
                }

                let xpath: string;
                if (elementId) {
                    xpath = `//*[@id="${elementId}"]`;
                } else {
                    const tagName = element.tagName.toLowerCase();
                    xpath = `//${tagName}[@class="${elementClass}"]`;
                }

                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify({ xpath }),
                        },
                    ],
                };
            }, { x, y });
        } catch (error) {
            return {
                isError: true,
                content: [
                    {
                        type: "text",
                        text: JSON.stringify({
                            error: error instanceof Error ? error.message : String(error)
                        }),
                    },
                ],
            };
        }
    }
}

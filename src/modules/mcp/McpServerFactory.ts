import {inject, injectable, multiInject} from "inversify";
import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import {dependencies} from "../../dependencies.js";
import type {Tool as ToolInterface, Context as ContextInterface, McpServerFactory as McpServerFactoryInterface} from "./types.js";

@injectable()
export class McpServerFactory implements McpServerFactoryInterface {
    constructor(
        @multiInject(dependencies.Tool) private tools: ToolInterface[],
        @inject(dependencies.Context) private context: ContextInterface
    ) {}

    create(): McpServer {
        const server = new McpServer({
            name: "scout",
            version: "1.0.0",
        });

        for (const tool of this.tools) {
            server.tool(
                tool.name,
                tool.description,
                tool.schema,
                async (params: any) => {
                    return await tool.handler(params, this.context);
                }
            );
        }

        return server;
    }
}

import {StdioServerTransport} from "@modelcontextprotocol/sdk/server/stdio.js";
import {container} from "./container.js";
import {dependencies} from "./dependencies.js";
import type {McpServerFactory as McpServerFactoryInterface} from "./modules/mcp/types.js";

(async () => {
    const factory = container.get<McpServerFactoryInterface>(dependencies.McpServerFactory);
    const server = factory.create();

    const transport = new StdioServerTransport();
    await server.connect(transport);
})();

import type {CallToolResult} from "@modelcontextprotocol/sdk/types.js";
import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import type {Context} from "../playwright/types.js";

export interface Tool {
    readonly name: string;
    readonly description: string;
    readonly schema: Record<string, unknown>;
    handler(params: any, context: Context): Promise<CallToolResult>;
}

export interface McpServerFactory {
    create(): McpServer;
}

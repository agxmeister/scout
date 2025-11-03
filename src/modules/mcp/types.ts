import type {CallToolResult} from "@modelcontextprotocol/sdk/types.js";
import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";

export interface Tool {
    readonly name: string;
    readonly description: string;
    readonly schema: Record<string, unknown>;
    handler(params: any, context: Context): Promise<CallToolResult>;
}

export interface Context {
    browser: any | null;
    currentPage: any | null;
    setBrowser(browser: any): void;
    setCurrentPage(page: any): void;
}

export interface McpServerFactory {
    create(): McpServer;
}

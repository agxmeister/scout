import type {CallToolResult} from "@modelcontextprotocol/sdk/types.js";
import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import type {Page} from "playwright";

export interface Tool {
    readonly name: string;
    readonly description: string;
    readonly schema: Record<string, unknown>;
    handler(params: any, context: Context): Promise<CallToolResult>;
}

export interface Context {
    browser: any | null;
    pages: Map<string, Page>;
    currentPage: Page | null;
    setBrowser(browser: any): void;
    addPage(name: string, page: Page): void;
    setCurrentPage(name: string): void;
    removePage(name: string): void;
    clearPages(): void;
}

export interface McpServerFactory {
    create(): McpServer;
}

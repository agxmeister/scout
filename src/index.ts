import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import {StdioServerTransport} from "@modelcontextprotocol/sdk/server/stdio.js";
import {Browser} from "playwright";
import {openWebPageTool} from "./tools/open-web-page.js";
import {clickCoordinatesTool} from "./tools/click-coordinates.js";
import {screenshotTool} from "./tools/screenshot.js";

const server = new McpServer({
    name: "scout",
    version: "1.0.0",
});

let browser: Browser | null = null;
let currentPage: any = null;

const getContext = () => ({
    browser,
    currentPage,
    setBrowser: (b: Browser) => { browser = b; },
    setCurrentPage: (p: any) => { currentPage = p; },
});

server.tool(openWebPageTool.name, openWebPageTool.description, openWebPageTool.schema, async (params: any) => {
    return await openWebPageTool.handler(params, getContext());
});

server.tool(clickCoordinatesTool.name, clickCoordinatesTool.description, clickCoordinatesTool.schema, async (params: any) => {
    return await clickCoordinatesTool.handler(params, getContext());
});

server.tool(screenshotTool.name, screenshotTool.description, screenshotTool.schema, async (params: any) => {
    return await screenshotTool.handler(params, getContext());
});

(async () => {
    const transport = new StdioServerTransport();
    await server.connect(transport);
})();

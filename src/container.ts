import "reflect-metadata";
import {Container} from "inversify";
import {join} from "path";
import {dependencies} from "./dependencies.js";
import type {Context as ContextInterface, McpServerFactory as McpServerFactoryInterface} from "./modules/mcp/types.js";
import type {BrowserFactory as BrowserFactoryInterface} from "./modules/playwright/types.js";
import {Context} from "./modules/mcp/Context.js";
import {McpServerFactory} from "./modules/mcp/McpServerFactory.js";
import {BrowserFactory} from "./modules/playwright/BrowserFactory.js";
import {DiscoveryService} from "./modules/discovery/DiscoveryService.js";

const container = new Container();

container.bind<ContextInterface>(dependencies.Context).to(Context).inSingletonScope();
container.bind<BrowserFactoryInterface>(dependencies.BrowserFactory).to(BrowserFactory);
container.bind(dependencies.DiscoveryService).toDynamicValue(() => {
    return new DiscoveryService(join(__dirname, "tools"));
});

container.bind<McpServerFactoryInterface>(dependencies.McpServerFactory).to(McpServerFactory);

export {container};

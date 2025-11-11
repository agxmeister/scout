import "reflect-metadata";
import {Container} from "inversify";
import {join} from "path";
import {dependencies} from "./dependencies.js";
import type {McpServerFactory as McpServerFactoryInterface} from "./modules/mcp/types.js";
import type {BrowserFactory as BrowserFactoryInterface, BrowserService as BrowserServiceInterface, Context as ContextInterface} from "./modules/playwright/types.js";
import type {ConfigFactory as ConfigFactoryInterface} from "./modules/config/types.js";
import {Context} from "./modules/playwright/Context.js";
import {McpServerFactory} from "./modules/mcp/McpServerFactory.js";
import {BrowserFactory} from "./modules/playwright/BrowserFactory.js";
import {BrowserService} from "./modules/playwright/BrowserService.js";
import {DiscoveryService} from "./modules/discovery/DiscoveryService.js";
import {ConfigFactory} from "./modules/config/ConfigFactory.js";

const container = new Container();

container.bind<ContextInterface>(dependencies.Context).to(Context).inSingletonScope();
container.bind<BrowserFactoryInterface>(dependencies.BrowserFactory).to(BrowserFactory);
container.bind<BrowserServiceInterface>(dependencies.BrowserService).to(BrowserService);
container.bind<ConfigFactoryInterface>(dependencies.ConfigFactory).toDynamicValue(() => {
    return new ConfigFactory(join(__dirname, "..", "config.json"));
});
container.bind(dependencies.DiscoveryService).toDynamicValue(() => {
    const configFactory = container.get<ConfigFactoryInterface>(dependencies.ConfigFactory);
    return new DiscoveryService(join(__dirname, "tools"), configFactory);
});

container.bind<McpServerFactoryInterface>(dependencies.McpServerFactory).to(McpServerFactory);

export {container};

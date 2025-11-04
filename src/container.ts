import "reflect-metadata";
import {Container} from "inversify";
import {dependencies} from "./dependencies.js";
import type {Tool as ToolInterface, Context as ContextInterface, McpServerFactory as McpServerFactoryInterface} from "./modules/mcp/types.js";
import {Context} from "./modules/mcp/Context.js";
import {McpServerFactory} from "./modules/mcp/McpServerFactory.js";
import {TakeScreenshot} from "./tools/TakeScreenshot.js";
import {OpenPage} from "./tools/OpenPage.js";
import {Click} from "./tools/Click.js";
import {CloseBrowser} from "./tools/CloseBrowser.js";

const container = new Container();

container.bind<ContextInterface>(dependencies.Context).to(Context).inSingletonScope();

container.bind<ToolInterface>(dependencies.Tool).to(TakeScreenshot);
container.bind<ToolInterface>(dependencies.Tool).to(OpenPage);
container.bind<ToolInterface>(dependencies.Tool).to(Click);
container.bind<ToolInterface>(dependencies.Tool).to(CloseBrowser);

container.bind<McpServerFactoryInterface>(dependencies.McpServerFactory).to(McpServerFactory);

export {container};

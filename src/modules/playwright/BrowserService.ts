import {injectable, inject} from "inversify";
import type {Browser} from "playwright";
import {dependencies} from "../../dependencies.js";
import type {BrowserService as BrowserServiceInterface} from "./types.js";
import type {BrowserFactory} from "./types.js";
import type {Context} from "./types.js";

@injectable()
export class BrowserService implements BrowserServiceInterface {
    constructor(
        @inject(dependencies.BrowserFactory) private browserFactory: BrowserFactory,
        @inject(dependencies.Context) private context: Context
    ) {}

    async getBrowser(): Promise<Browser> {
        if (!this.context.browser) {
            const browser = await this.browserFactory.create();
            this.context.setBrowser(browser);
        }
        return this.context.browser!;
    }
}

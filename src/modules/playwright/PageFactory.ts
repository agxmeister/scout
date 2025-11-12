import {injectable, inject} from "inversify";
import type {Page} from "playwright";
import {dependencies} from "../../dependencies.js";
import type {PageFactory as PageFactoryInterface} from "./types.js";
import type {BrowserService} from "./types.js";

@injectable()
export class PageFactory implements PageFactoryInterface {
    constructor(
        @inject(dependencies.BrowserService) private browserService: BrowserService
    ) {}

    async create(): Promise<Page> {
        const browser = await this.browserService.getBrowser();
        const browserContext = await browser.newContext();
        return await browserContext.newPage();
    }
}

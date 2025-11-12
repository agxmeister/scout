import {injectable, inject} from "inversify";
import type {Page} from "playwright";
import {dependencies} from "../../dependencies.js";
import type {PageService as PageServiceInterface} from "./types.js";
import type {PageFactory} from "./types.js";
import type {Context} from "./types.js";

@injectable()
export class PageService implements PageServiceInterface {
    constructor(
        @inject(dependencies.PageFactory) private pageFactory: PageFactory,
        @inject(dependencies.Context) private context: Context
    ) {}

    async getNewPage(name: string): Promise<Page> {
        const page = await this.pageFactory.create();
        this.context.addPage(name, page);
        return page;
    }

    getCurrentPage(): Page | null {
        return this.context.currentPage;
    }
}

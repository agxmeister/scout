import {injectable} from "inversify";
import {Browser} from "playwright";
import type {Context as ContextInterface} from "./types.js";

@injectable()
export class Context implements ContextInterface {
    browser: Browser | null = null;
    currentPage: any = null;

    setBrowser(browser: Browser): void {
        this.browser = browser;
    }

    setCurrentPage(page: any): void {
        this.currentPage = page;
    }
}

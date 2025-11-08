import {injectable} from "inversify";
import {Browser, Page} from "playwright";
import type {Context as ContextInterface} from "./types.js";

@injectable()
export class Context implements ContextInterface {
    browser: Browser | null = null;
    pages: Map<string, Page> = new Map();
    currentPage: Page | null = null;

    setBrowser(browser: Browser): void {
        this.browser = browser;
    }

    addPage(name: string, page: Page): void {
        if (this.pages.has(name)) {
            throw new Error(`Page with name "${name}" already exists`);
        }
        this.pages.set(name, page);
        this.currentPage = page;
    }

    setCurrentPage(name: string): void {
        const page = this.pages.get(name);
        if (!page) {
            throw new Error(`Page with name "${name}" not found`);
        }
        this.currentPage = page;
    }

    removePage(name: string): void {
        const page = this.pages.get(name);
        if (!page) {
            throw new Error(`Page with name "${name}" not found`);
        }
        this.pages.delete(name);

        if (this.currentPage === page) {
            this.currentPage = null;
        }
    }

    clearPages(): void {
        this.pages.clear();
        this.currentPage = null;
    }
}

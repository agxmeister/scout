import type {Browser, Page} from "playwright";

export interface Context {
    browser: Browser | null;
    pages: Map<string, Page>;
    currentPage: Page | null;
    setBrowser(browser: Browser): void;
    addPage(name: string, page: Page): void;
    setCurrentPage(name: string): void;
    removePage(name: string): void;
    clearPages(): void;
}

export interface BrowserFactory {
    create(): Promise<Browser>;
}

export interface BrowserService {
    getBrowser(): Promise<Browser>;
}

export interface PageFactory {
    create(): Promise<Page>;
}

export interface PageService {
    getNewPage(name: string): Promise<Page>;
    getCurrentPage(): Page | null;
}

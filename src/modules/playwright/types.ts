import type {Browser} from "playwright";

export interface BrowserFactory {
    create(): Promise<Browser>;
}

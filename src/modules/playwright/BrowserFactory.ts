import {injectable} from "inversify";
import {chromium} from "playwright";
import type {Browser} from "playwright";
import type {BrowserFactory as BrowserFactoryInterface} from "./types.js";

@injectable()
export class BrowserFactory implements BrowserFactoryInterface {
    async create(): Promise<Browser> {
        return await chromium.launch({
            headless: false,
        });
    }
}

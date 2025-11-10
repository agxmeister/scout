import { injectable } from "inversify";
import { readFile } from "fs/promises";
import { ConfigSchema } from "./schemas.js";
import type { Config, ConfigFactory as ConfigFactoryInterface } from "./types.js";

@injectable()
export class ConfigFactory implements ConfigFactoryInterface {
    constructor(private configPath: string) {}

    async create(): Promise<Config> {
        try {
            const content = await readFile(this.configPath, "utf-8");
            const json = JSON.parse(content);
            const config = ConfigSchema.parse(json);
            return config;
        } catch (error) {
            return {};
        }
    }
}

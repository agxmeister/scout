import { injectable } from "inversify";
import { readdir } from "fs/promises";
import { join, basename } from "path";
import type { ConfigFactory } from "../config/types.js";

@injectable()
export class DiscoveryService {
    constructor(private toolsDir: string, private configFactory: ConfigFactory) {}

    async discoverTools(): Promise<void> {
        const config = await this.configFactory.create();
        const files = await readdir(this.toolsDir);

        for (const file of files) {
            if (file.endsWith(".js")) {
                const toolName = basename(file, ".js");

                if (config.tools && !config.tools.includes(toolName)) {
                    continue;
                }

                await import(join(this.toolsDir, file));
            }
        }
    }
}

import { injectable } from "inversify";
import { readdir } from "fs/promises";
import { join } from "path";

@injectable()
export class DiscoveryService {
    constructor(private toolsDir: string) {}

    async discoverTools(): Promise<void> {
        const files = await readdir(this.toolsDir);

        for (const file of files) {
            if (file.endsWith(".js")) {
                await import(join(this.toolsDir, file));
            }
        }
    }
}

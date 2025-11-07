import { injectable } from "inversify";
import type { Tool } from "../modules/mcp/types.js";
import { container } from "../container.js";
import { dependencies } from "../dependencies.js";

export function tool() {
    return function <T extends new (...args: any[]) => Tool>(target: T) {
        injectable()(target);
        container.bind<Tool>(dependencies.Tool).to(target);
        return target;
    };
}

import * as zod from "zod";

export const ConfigSchema = zod.object({
    tools: zod.array(zod.string()).optional(),
});

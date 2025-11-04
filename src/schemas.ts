import * as zod from "zod";

export const OpenWebPageSchema = zod.object({
    url: zod.string().describe("URL of the web page to open"),
});

export const ClickCoordinatesSchema = zod.object({
    x: zod.number().describe("X coordinate to click"),
    y: zod.number().describe("Y coordinate to click"),
});

export const ScreenshotSchema = zod.object({});

export const CloseBrowserSchema = zod.object({});

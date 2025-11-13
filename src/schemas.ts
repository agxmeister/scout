import * as zod from "zod";

export const OpenWebPageSchema = zod.object({
    url: zod.string().describe("URL of the web page to open"),
});

export const ClickCoordinatesSchema = zod.object({
    x: zod.number().describe("X coordinate to click"),
    y: zod.number().describe("Y coordinate to click"),
});

export const ScreenshotSchema = zod.object({});

export const OpenBrowserSchema = zod.object({});

export const CloseBrowserSchema = zod.object({});

export const GetLocatorSchema = zod.object({
    x: zod.number().describe("X coordinate of the element"),
    y: zod.number().describe("Y coordinate of the element"),
});

export const SwitchPageSchema = zod.object({
    name: zod.string().describe("Name of the page to switch to"),
});

export const ListPagesSchema = zod.object({});

export const NavigatePageSchema = zod.object({
    url: zod.string().describe("URL to navigate to"),
});

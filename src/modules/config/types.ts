export interface Config {
    tools?: string[];
}

export interface ConfigFactory {
    create(): Promise<Config>;
}

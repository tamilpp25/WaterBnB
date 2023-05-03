import { readFileSync, readdirSync, writeFileSync } from "fs";
import path, { resolve } from 'path';


const DEFAULT_CONFIG = {

    // MongoDB
    MONGO_URI: "mongodb://0.0.0.0:27017/WaterBnB",
    
    // HTTP
    HTTP: {
        HTTP_HOST: "localhost",
        HTTP_PORT: 5000
    },
}

type DefaultConfig = typeof DEFAULT_CONFIG;

function r(...args: string[]) {
    return readFileSync(resolve(__dirname, ...args)).toString();
}

function rd(...args: string[]) {
    return readdirSync(resolve(__dirname, ...args)).toString();
}

function readConfig(): any {
    let config: DefaultConfig;
    try {
        config = JSON.parse(r('../../config.json'));
        // Check if config object.keys is the same as DEFAULT_CONFIG.keys
        const missing = Object.keys(DEFAULT_CONFIG).filter(key => !config.hasOwnProperty(key));

        if (missing.length > 0) {
            missing.forEach(key => {
                // @ts-ignore
                config[key] = DEFAULT_CONFIG[key];
            });
            updateConfig(config);
            console.log(`Added missing config keys: ${missing.join(', ')}`);
        }
    } catch {
        console.error("Could not read config file. Creating one for you...");
        config = DEFAULT_CONFIG;
        updateConfig(config);
    }
    return config;
}

function updateConfig(config: any) {
    writeFileSync('./config.json', JSON.stringify(config, null, 2));
}

export function resolveWindyPath(folder: string,file: string){
    const pathData = r(folder,file,'.luac')
    return pathData
}

export default class Config {
    public static config = readConfig();
    public static MONGO_URI: string = Config.config.MONGO_URI;
    public static HTTP: {
        HTTP_HOST: string,
        HTTP_PORT: number,
        API_KEY: string
    } = Config.config.HTTP;

    private constructor() { }
}

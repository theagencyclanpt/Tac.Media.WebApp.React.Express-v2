/* eslint-disable no-var */
var registry: { [key: string]: any } = {};

export default class Configurations {

    static getRegistered(key: string): any {
        const registered = registry[key];
        if (registered) {
            return registered;
        } else {
            throw new Error(`Error: ${key} was not registered.`);
        }
    }

    static register(key: string, value: any) {
        const registered = registry[key];
        if (registered) {
            throw new Error(`Error: ${key} is already registered.`);
        }
        registry[key] = value;
    }
}
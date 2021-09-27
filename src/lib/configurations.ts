export class Configurations {

    private _registry: { [key: string]: any } = {};

    public get(key: string): any {
        const registered = this._registry[key];
        if (registered) {
            return registered;
        } else {
            throw new Error(`Error: ${key} was not registered.`);
        }
    }

    public add(key: string, value: any): this {
        const registered = this._registry[key];
        if (registered) {
            throw new Error(`Error: ${key} is already registered.`);
        }
        this._registry[key] = value;

        return this;
    }
}
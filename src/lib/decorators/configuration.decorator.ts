import { Configurations } from "@/lib/configurations";

export function InjectConfiguration(configurationName: string) {
    return (target: any, key: string) => {

        // property getter
        const getter = function () {
            const _configurations = this["__aplication__configurations"] as Configurations;
            return _configurations.get(configurationName);
        };

        // Delete property.
        if (delete this[key]) {

            // Create new property with getter and setter
            Object.defineProperty(target, key, {
                get: getter,
                enumerable: true,
                configurable: true
            });
        }
    }
}
import Configurations from "../configurations";

export function InjectConfiguration(key: string) {
    return (target: any, property: string) => {

        console.log(Configurations.getRegistered(key));

        // target[property] = Configurations.getRegistered(key);
    };
}
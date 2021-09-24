import { BannerConfigurationInput } from "./BannerConfigurationInput";

export interface BannerConfiguration {
    Id: number;
    Description: string;
    Background: string;
    Overlay: string;
    Font: string;
    Inputs: BannerConfigurationInput[];
}
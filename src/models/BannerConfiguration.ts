import { BannerConfigurationInput } from "./BannerConfigurationInput";

export interface BannerConfiguration {
    Id: number;
    Description: string;
    Width: number;
    Height: number;
    Font: string;
    Inputs: BannerConfigurationInput[];
}
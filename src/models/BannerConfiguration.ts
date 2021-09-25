import { BannerConfigurationInput } from "./BannerConfigurationInput";

type BannerConfigurationType = "instagram" | "twitter";
export interface BannerConfiguration {
    Id: number;
    Type: BannerConfigurationType;
    Description: string;
    Background: string;
    Overlay: string;
    Font: string;
    Inputs: BannerConfigurationInput[];
}
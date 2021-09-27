import { BannerConfiguration } from "./BannerConfiguration";

export interface GroupBannerConfiguration {
    Id: number;
    Description: string;
    Instagram: BannerConfiguration;
    Twitter: BannerConfiguration;
}
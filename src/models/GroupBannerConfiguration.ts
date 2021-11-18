export interface ConfigurationSocialMediaField {
    Id: string
}

export interface ConfigurationSocialMedia {
    Layers: {
        [key: string]: string
    };
    Fields: ConfigurationSocialMediaField[]
}

export interface GroupBannerConfiguration {
    Id: number;
    Instagram: ConfigurationSocialMedia;
    Twitter: ConfigurationSocialMedia;
}
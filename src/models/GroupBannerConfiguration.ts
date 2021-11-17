export interface ConfigurationSocialMediaField {
    Id: string
}

export interface ConfigurationSocialMedia {
    BackgroundImage: string;
    Fields: ConfigurationSocialMediaField[]
}

export interface GroupBannerConfiguration {
    Id: number;
    Instagram: ConfigurationSocialMedia;
    Twitter: ConfigurationSocialMedia;
}
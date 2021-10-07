export interface GenerateBannerUrlRequest {
    ImageBase64?: string;
    Group: {
        InstagramImageBase64: string;
        TwitterImageBase64: string;
    };
    FormData: { [key: string]: any }
}
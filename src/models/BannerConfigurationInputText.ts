import { BannerConfigurationInput } from "./BannerConfigurationInput";

type BannerConfigurationInputTextTextAlign = "Start" | "Center" | "End";

export interface BannerConfigurationInputText extends BannerConfigurationInput {
    Font?: string | null;
    Color?: string | null;
    TextAlign?: BannerConfigurationInputTextTextAlign | null;
}
import { BaseController } from "@/lib/base.controller";
import { Controller, Get, Post, RequestBody, RequestQuery } from "@/lib/decorators";
import { LogicError } from "@/lib/entities";
import { BannerConfiguration } from "../models/BannerConfiguration";
import BannerConfigurations from "../configuration";

interface GetBannerConfigurationByIdRequestQuery {
    id: number;
}

interface GenerateBannerUrlRequestBody {
    ImageBase64: string;
}

@Controller("/banner")
export class BannerController extends BaseController {

    @Get("/configurations")
    GetBannerConfigurations(): BannerConfiguration[] {
        return BannerConfigurations;
    }

    @Get("/configurationById")
    GetBannerConfigurationById(@RequestQuery { id }: GetBannerConfigurationByIdRequestQuery): BannerConfiguration {
        const result = BannerConfigurations.find(e => e.Id == id);

        if (!result) {
            throw new LogicError("O template selecionado é inválido.");
        }

        return result;
    }

    @Post("/generate-url")
    GenerateBannerUrl(@RequestBody { ImageBase64 }: GenerateBannerUrlRequestBody): string {
        return "asd";
    }
}
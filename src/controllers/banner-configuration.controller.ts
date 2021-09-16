import { BaseController } from "@/lib/base.controller";
import { Controller, Get, RequestQuery } from "@/lib/decorators";
import { LogicError } from "@/lib/entities";
import { BannerConfiguration } from "../models/BannerConfiguration";
import BannerConfigurations from "../configuration";

interface GetBannerConfigurationByIdRequestQuery {
    id: number;
}

@Controller("/banner-configuration")
export class BannerConfigurationController extends BaseController {

    @Get("/")
    Get(): BannerConfiguration[] {
        return BannerConfigurations;
    }

    @Get("/configurationById")
    GetBannerConfigurationById(@RequestQuery Query: GetBannerConfigurationByIdRequestQuery): BannerConfiguration {
        const result = BannerConfigurations.find(e => e.Id == Query.id);

        if (!result) {
            throw new LogicError("O template selecionado é inválido.");
        }

        return result;
    }
}
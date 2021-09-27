import { BaseController } from "@/lib/base.controller";
import { Controller, Get, Post, RequestBody, RequestQuery, InjectConfiguration } from "@/lib/decorators";
import { LogicError } from "@/lib/entities";
import { BannerConfiguration } from "../models/BannerConfiguration";
import BannerConfigurations from "../configuration";
import { writeFile, mkdir as fs_mkdir } from "fs";
import { join as p_join } from "path";
import { v1 as u_v1 } from "uuid";

interface GetBannerConfigurationByIdRequestQuery {
    id: number;
}

interface GenerateBannerUrlRequestBody {
    ImageBase64?: string;
    Group: {
        InstagramImageBase64: string;
        TwitterImageBase64: string;
    };
}

@Controller("/banner")
export class BannerController extends BaseController {
    private _tempDirectory = p_join(__dirname, '..', '..', 'temp', 'banners')

    @InjectConfiguration("asd")
    private _bannerConfiguration: string;

    @Get("/configurations")
    GetBannerConfigurations(): BannerConfiguration[] {
        console.log("@TEST", this._bannerConfiguration);
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
    async GenerateBannerUrl(@RequestBody { ImageBase64, Group }: GenerateBannerUrlRequestBody): Promise<string> {

        if (Group) {
            const directoryName = u_v1();
            const directory = await this.Mkdir(directoryName);
            await this.SaveImageOnTempDirectory(directory, "twitter", Group.TwitterImageBase64);
            // await this.SaveImageOnTempDirectory(directory, "instagram", Group.InstagramImageBase64);

            return "/preview/" + directoryName;
        }

        throw new LogicError("A aplicação só suporte fazer grupo de banners.");
    }

    private async SaveImageOnTempDirectory(directory, imageName: string, imageBase64: string): Promise<void> {
        return new Promise((resolve, reject) => {
            writeFile(p_join(directory, imageName + ".png"), imageBase64.replace(/^data:image\/png;base64,/, ""), 'base64', function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    private async Mkdir(directoryName: string): Promise<string> {
        const path = p_join(this._tempDirectory, directoryName);

        return new Promise((resolve, reject) => {
            fs_mkdir(path, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(path);
                }
            })
        });
    }
}
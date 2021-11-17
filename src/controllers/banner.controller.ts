import { BaseController } from "@/lib/base.controller";
import { Controller, Get, Post, RequestBody, InjectConfiguration, RequestParams } from "@/lib/decorators";
import { LogicError } from "@/lib/entities";
import { GenerateBannerUrlRequest } from "@/model/GenerateBannerUrlRequest";
import { GetGroupBannerConfigurationRequest } from "@/model/GetGroupBannerConfigurationRequest";
import { GroupBannerConfiguration } from "@/model/GroupBannerConfiguration";
import { GroupConfigurations } from "../configuration";
import { writeFile, mkdir as fs_mkdir } from "fs";
import { join as p_join } from "path";
import { v1 as u_v1 } from "uuid";

@Controller("/banner")
export class BannerController extends BaseController {
    @InjectConfiguration("DIRECTORY_TEMP")
    private _tempDirectory: string;

    @Get("/group/configuration/:id")
    GetGroupBannerConfiguration(@RequestParams { id }: GetGroupBannerConfigurationRequest): GroupBannerConfiguration {
        console.log(GroupConfigurations.find(e => e.Id == id));
        return GroupConfigurations.find(e => e.Id == id);
    }

    @Post("/generate-url")
    async GenerateBannerUrl(@RequestBody { Group, FormData }: GenerateBannerUrlRequest): Promise<string> {

        if (Group) {
            const directoryName = u_v1();
            const directory = await this.Mkdir(directoryName);
            await this.SaveImageOnTempDirectory(directory, "instagram", Group.InstagramImageBase64);
            await this.SaveImageOnTempDirectory(directory, "twitter", Group.TwitterImageBase64);

            if (FormData) {
                await this.SaveDataOnTempDirectory(directory, JSON.stringify(FormData));
            }

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

    private async SaveDataOnTempDirectory(directory, data: any): Promise<void> {
        return new Promise((resolve, reject) => {
            writeFile(p_join(directory, "data.json"), data, 'utf-8', function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    private async Mkdir(directoryName: string): Promise<string> {
        const path = p_join(this._tempDirectory, "banners", directoryName);

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
import path from 'path';
import dotenv from "dotenv";
import { Application } from "@/lib";
import * as Controllers from "./controllers";
import Cors from "cors";
import { access as fs_access, mkdir as fs_mkdir } from "fs";
import { UserConfig } from "@/models";

dotenv.config();

const PUBLIC_URL: string = process.env.PUBLIC_URL || '';
const PORT: string = process.env.API_PORT || '3000';
const isProduction: boolean = process.env.ENV != "development";
const directoryTemp = isProduction ? path.join(__dirname, 'temp') : path.join(__dirname, '..', 'temp');
const resources = isProduction ? path.join(__dirname, 'resources') : path.join(__dirname, '..', 'resources');

fs_access(directoryTemp, function (error) {
  if (error) {
    fs_mkdir(directoryTemp, (err) => {
      if (!err) {
        fs_mkdir(path.join(directoryTemp, "banners"), (err) => err && console.log(err))
      } else {
        console.log(err);
      }
    });
  }
});

const _application = new Application();

_application
  .useConfigurations(
    provider => provider.add("DIRECTORY_TEMP", directoryTemp),
    provider => provider.add("SUPER_ADMIN", new UserConfig("admin", "password"))
  )
  .useJWTAuthentication("JWT_TOKEN_SUPER_SECRET", "2h")
  .useControllers(Object.values(Controllers))
  .addApplicationConfiguration(
    (provider) => {
      provider.use('/temp', _application.addStaticFiles(directoryTemp));
      provider.use('/resources', _application.addStaticFiles(resources));
    }
  )
  .addApplicationConfiguration(
    (provider) => {
      if (isProduction) {
        provider.use(
          PUBLIC_URL,
          _application.addStaticFiles(path.resolve(__dirname, 'www'))
        );

        provider.get('*', (_, res) => {
          res.sendFile(path.resolve(__dirname, './www/index.html'));
        });
      } else {
        provider.use(Cors({ origin: "http://localhost:4333" }));
      }
    }
  )
  .useErrorHandler()
  .listen(PORT);
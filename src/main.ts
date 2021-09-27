/* eslint-disable no-prototype-builtins */
import path from 'path';
import dotenv from "dotenv";
import { Application } from "@/lib";
import * as Controllers from "./controllers";
import Cors from "cors";

dotenv.config();

const PUBLIC_URL: string = process.env.PUBLIC_URL || '';
const PORT: string = process.env.API_PORT || '3000';
const isProduction: boolean = process.env.ENV != "development";

const _application = new Application();

_application
  .useErrorHandler()
  .useConfigurations(
    (provider) => provider.add("asd", "OLÁ TEST")
  )
  .useControllers(Object.values(Controllers))
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
  .addApplicationConfiguration(
    (provider) => {
      provider.use('/temp', _application.addStaticFiles(path.join(__dirname, '..', 'temp', 'banners')));
      provider.use('/resources', _application.addStaticFiles(path.join(__dirname, '..', 'resources')));
    }
  )
  .listen(PORT);
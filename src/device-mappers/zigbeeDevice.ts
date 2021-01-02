import { CLIENT_ID, CLIENT_SECRET } from "./../config";
import * as fs from "fs";
import { IOT_SERVER } from "../config";
import { DeviceConfig, AuthData, IotDevice } from "@wiklosoft/ng-iot";

export class ZigbeeDevice extends IotDevice {
  zigbeeAddress: string;
  configFile: string;
  pressed: boolean;

  constructor(zigbeeAddress: string, config: DeviceConfig) {
    super(IOT_SERVER, config, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });
    this.zigbeeAddress = zigbeeAddress;
  }

  getZigbeeAddress() {
    return this.zigbeeAddress;
  }

  handleValueUpdate(cluster: string, value: any) {}

  async readAuthData() {
    const data = (await fs.promises.readFile(this.getAuthConfigFilename())).toString("utf-8");
    this.auth = JSON.parse(data) as AuthData;
  }
  async saveAuthData(auth: AuthData) {
    await fs.promises.writeFile(this.getAuthConfigFilename(), JSON.stringify(auth, null, 2));
  }
}

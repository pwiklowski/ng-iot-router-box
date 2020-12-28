import * as fs from "fs";
import { IOT_SERVER } from "../config";
import { DeviceConfig, AuthData, IotDevice } from "@wiklosoft/ng-iot";

export class ZigbeeDevice extends IotDevice {
  zigbeeAddress: string;
  configFile: string;
  pressed: boolean;

  constructor(zigbeeAddress: string, config: DeviceConfig, configFile: string) {
    super(IOT_SERVER, config);
    this.zigbeeAddress = zigbeeAddress;
    this.configFile = configFile;
  }

  getZigbeeAddress() {
    return this.zigbeeAddress;
  }

  handleValueUpdate(value: any) {}

  async readAuthData() {
    const data = (await fs.promises.readFile(this.configFile)).toString("utf-8");
    this.auth = JSON.parse(data) as AuthData;
  }
  async saveAuthData(auth: AuthData) {
    await fs.promises.writeFile(this.configFile, JSON.stringify(auth, null, 2));
  }
}

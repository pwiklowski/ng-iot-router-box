import * as fs from "fs";
import { IOT_SERVER } from "./../config";
import { Permission, DeviceConfig, AuthData, IotDevice } from "@wiklosoft/ng-iot";

const switchDeviceConfig: DeviceConfig = {
  name: "Zigbee Button",
  deviceUuid: "62fd0148-7023-4e36-a6a5-79ae12753d97",
  vars: {
    "c391b0c7-0464-4a8d-aee8-0fe307a85247": {
      name: "State",
      schema: {
        $schema: "http://json-schema.org/draft-04/schema#",
        type: "object",
        properties: {
          onOff: { type: "integer" },
        },
        required: ["onOff"],
        additionalProperties: false,
      },
      access: Permission.READ,
      value: {
        onOff: 1,
      },
    },
  },
};

export class SwitchDevice extends IotDevice {
  zigbeeAddress: string;
  configFile: string;

  constructor(zigbeeAddress: string, name: string, deviceUuid: string, configFile: string) {
    super(IOT_SERVER, { ...switchDeviceConfig, name, deviceUuid });
    this.zigbeeAddress = zigbeeAddress;

    this.configFile = configFile;
  }

  getZigbeeAddress() {
    return this.zigbeeAddress;
  }

  handleValueUpdate(value: object) {
    if (value["onOff"] !== undefined) {
      if (value["onOff"] === 0) {
        this.updateValue("c391b0c7-0464-4a8d-aee8-0fe307a85247", { onOff: 1 });
        this.updateValue("c391b0c7-0464-4a8d-aee8-0fe307a85247", { onOff: 0 });
      }
    } else if (value["32768"] !== undefined) {
      this.updateValue("c391b0c7-0464-4a8d-aee8-0fe307a85247", { onOff: value["32768"] });
      this.updateValue("c391b0c7-0464-4a8d-aee8-0fe307a85247", { onOff: 0 });
    }
  }

  async readAuthData() {
    const data = (await fs.promises.readFile(this.configFile)).toString("utf-8");
    this.auth = JSON.parse(data) as AuthData;
  }
  async saveAuthData(auth: AuthData) {
    await fs.promises.writeFile(this.configFile, JSON.stringify(auth, null, 2));
  }
}

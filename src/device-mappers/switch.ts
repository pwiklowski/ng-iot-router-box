import * as fs from "fs";
import { CONFIG_FILE, IOT_SERVER } from "./../config";
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

  constructor(zigbeeAddress: string) {
    super(IOT_SERVER, switchDeviceConfig);
    this.zigbeeAddress = zigbeeAddress;
  }

  getZigbeeAddress() {
    return this.zigbeeAddress;
  }

  handleValueUpdate(value: object) {
    if (value.onOff !== undefined) {
      const newValue = { onOff: value.onOff };
      this.updateValue("c391b0c7-0464-4a8d-aee8-0fe307a85247", newValue);
    }
  }

  async readAuthData() {
    const data = (await fs.promises.readFile(CONFIG_FILE)).toString("utf-8");
    this.auth = JSON.parse(data) as AuthData;
  }
  async saveAuthData(auth: AuthData) {
    await fs.promises.writeFile(CONFIG_FILE, JSON.stringify(auth, null, 2));
  }
}

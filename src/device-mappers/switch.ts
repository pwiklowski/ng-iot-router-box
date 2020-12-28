import { Permission, DeviceConfig } from "@wiklosoft/ng-iot";
import { ZigbeeDevice } from "./zigbeeDevice";

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

export class SwitchDevice extends ZigbeeDevice {
  pressed: boolean;

  constructor(zigbeeAddress: string, name: string, deviceUuid: string, configFile: string) {
    super(zigbeeAddress, { ...switchDeviceConfig, name, deviceUuid }, configFile);
  }

  handleValueUpdate(value: any) {
    if (this.pressed) {
      this.pressed = false;
    } else if (value.genOnOff.attributes.onOff === 0) {
      this.updateValue("c391b0c7-0464-4a8d-aee8-0fe307a85247", { onOff: 1 });
      this.updateValue("c391b0c7-0464-4a8d-aee8-0fe307a85247", { onOff: 0 });
      this.pressed = true;
    } else if (value.genOnOff.attributes.onOff === 1) {
      this.updateValue("c391b0c7-0464-4a8d-aee8-0fe307a85247", { onOff: value.genOnOff.attributes["32768"] });
      this.updateValue("c391b0c7-0464-4a8d-aee8-0fe307a85247", { onOff: 0 });
    }
  }
}

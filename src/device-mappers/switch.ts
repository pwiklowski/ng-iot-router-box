import { Permission, DeviceConfig } from "@wiklosoft/ng-iot";
import { ZigbeeDevice } from "./zigbeeDevice";

const VARIABLE_UUID = "c391b0c7-0464-4a8d-aee8-0fe307a85247";

const switchDeviceConfig: DeviceConfig = {
  name: "Zigbee Button",
  deviceUuid: "62fd0148-7023-4e36-a6a5-79ae12753d97",
  vars: {
    [VARIABLE_UUID]: {
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
  constructor(zigbeeAddress: string, name: string, deviceUuid: string) {
    super(zigbeeAddress, { ...switchDeviceConfig, name, deviceUuid });
  }

  handleValueUpdate(cluster: string, value: any) {
    if (cluster === "genOnOff") {
      if (value.onOff !== undefined) {
        this.updateValue(VARIABLE_UUID, { onOff: value.onOff === 0 ? 1 : 0 });
      } else if (value["32768"] !== undefined) {
        this.updateValue(VARIABLE_UUID, { onOff: value["32768"] });
        this.updateValue(VARIABLE_UUID, { onOff: 0 });
      }
    }
  }
}

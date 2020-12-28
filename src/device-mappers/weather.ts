import { Permission, DeviceConfig } from "@wiklosoft/ng-iot";
import { ZigbeeDevice } from "./zigbeeDevice";

const VARIABLE_UUID = "c391b0c7-0464-4a8d-aee8-0fe307a85247";

const weatherDeviceConfig: DeviceConfig = {
  name: "Zigbee Button",
  deviceUuid: "62fd0148-7023-4e36-a6a5-79ae12753d97",
  vars: {
    [VARIABLE_UUID]: {
      name: "Weather State",
      schema: {
        $schema: "http://json-schema.org/draft-04/schema#",
        type: "object",
        properties: {
          temperature: { type: "number" },
          humidity: { type: "number" },
          pressure: { type: "number" },
        },
        required: ["temperature", "humidity", "pressure"],
        additionalProperties: false,
      },
      access: Permission.READ,
      value: {
        temperature: -1,
        humidity: -1,
        pressure: -1,
      },
    },
  },
};

export class WeatherSensor extends ZigbeeDevice {
  pressed: boolean;

  constructor(zigbeeAddress: string, name: string, deviceUuid: string, configFile: string) {
    super(zigbeeAddress, { ...weatherDeviceConfig, name, deviceUuid }, configFile);
  }

  handleValueUpdate(value: any) {
    const temperature = value.msTemperatureMeasurement.attributes.measuredValue / 100;
    const humidity = value.msRelativeHumidity.attributes.measuredValue / 100;
    const pressure = value.msPressureMeasurement.attributes.measuredValue;

    this.updateValue("c391b0c7-0464-4a8d-aee8-0fe307a85247", { temperature, humidity, pressure });
  }
}

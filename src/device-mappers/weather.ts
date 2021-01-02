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
  temperature: number;
  humidity: number;
  pressure: number;

  constructor(zigbeeAddress: string, name: string, deviceUuid: string) {
    super(zigbeeAddress, { ...weatherDeviceConfig, name, deviceUuid });
  }

  handleValueUpdate(cluster: string, value: any) {
    console.log(cluster, value);

    if (cluster === "genBasic" && value.hasOwnProperty("65281")) {
      this.temperature = value["65281"]["100"] / 100;
      this.humidity = value["65281"]["101"] / 100;
      this.pressure = value["65281"]["102"] / 100;
    }

    if (cluster === "msTemperatureMeasurement") {
      this.temperature = value.measuredValue / 100;
    }

    if (cluster === "msRelativeHumidity") {
      this.humidity = value.measuredValue / 100;
    }

    if (cluster === "msPressureMeasurement") {
      this.pressure = value.scaledValue / 10;
    }

    this.updateValue(VARIABLE_UUID, { temperature: this.temperature, humidity: this.humidity, pressure: this.pressure });
  }
}

import { WeatherSensor } from "./device-mappers/weather";
import { SwitchDevice } from "./device-mappers/switch";
import { IotDevice } from "@wiklosoft/ng-iot";

const BUTTON_1 = "0x00158d0001e80e6f";
const BUTTON_2 = "0x00158d0002048a20";
const BUTTON_3 = "0x00158d0002048ae4";

const WEATHER_1 = "0x00158d0002b557dc";
const WEATHER_2 = "0x00158d0002b5569d";
const WEATHER_3 = "0x00158d0002b557f2";

export class IotDeviceManager {
  devices = Array<IotDevice>();

  constructor() {
    this.devices.push(new SwitchDevice(BUTTON_1, "Zigbee Button 1", "62fd0148-7023-4e36-a6a5-79ae12753d97", "auth1.json"));
    this.devices.push(new SwitchDevice(BUTTON_2, "Zigbee Button 2", "63fd0148-7023-4e36-a6a5-79ae12753d97", "auth1.json"));
    this.devices.push(new SwitchDevice(BUTTON_3, "Zigbee Button 3", "64fd0148-7023-4e36-a6a5-79ae12753d97", "auth1.json"));

    this.devices.push(new WeatherSensor(WEATHER_1, "Weather Sensor 1", "01fd0148-7023-4e36-a6a5-79ae12753d97", "auth1.json"));
    this.devices.push(new WeatherSensor(WEATHER_2, "Weather Sensor 2", "02fd0148-7023-4e36-a6a5-79ae12753d97", "auth1.json"));
    this.devices.push(new WeatherSensor(WEATHER_3, "Weather Sensor 3", "03fd0148-7023-4e36-a6a5-79ae12753d97", "auth1.json"));
  }

  start() {
    this.devices.forEach(async (device) => await device.start());
  }

  handleDeviceUpdate(address: string, cluster: string, value: object) {
    this.devices.map((device: SwitchDevice) => {
      if (device.getZigbeeAddress() === address) {
        device.handleValueUpdate(cluster, value);
      }
    });
  }
}

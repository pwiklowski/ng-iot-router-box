import { SwitchDevice } from "./device-mappers/switch";
import { IotDevice } from "@wiklosoft/ng-iot";

const BUTTON_1 = "0x00158d0001e80e6f";
const BUTTON_2 = "0x00158d0002048a20";

export class IotDeviceManager {
  devices = Array<IotDevice>();

  constructor() {
    this.devices.push(new SwitchDevice(BUTTON_1, "Zigbee Button 1", "62fd0148-7023-4e36-a6a5-79ae12753d97", "auth1.json"));
    this.devices.push(new SwitchDevice(BUTTON_2, "Zigbee Button 2", "63fd0148-7023-4e36-a6a5-79ae12753d97", "auth2.json"));
  }

  start() {
    this.devices.forEach(async (device) => await device.start());
  }

  handleDeviceUpdate(address: string, value: object) {
    this.devices.map((device: SwitchDevice) => {
      if (device.getZigbeeAddress() === address) {
        device.handleValueUpdate(value);
      }
    });
  }
}

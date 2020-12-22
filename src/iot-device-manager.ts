import { SwitchDevice } from "./device-mappers/switch";
import { IotDevice } from "@wiklosoft/ng-iot";

const BUTTON_1 = "0x00158d0001e80e6f";

export class IotDeviceManager {
  devices = Array<IotDevice>();

  constructor() {
    this.devices.push(new SwitchDevice(BUTTON_1));
  }

  start() {
    this.devices.forEach((device) => device.start());
  }

  handleDeviceUpdate(address: string, value: object) {
    console.log("handleDeviceUpdate", address, value);

    this.devices.map((device: SwitchDevice) => {
      if (device.getZigbeeAddress() === address) {
        device.handleValueUpdate(value);
      }
    });
  }
}

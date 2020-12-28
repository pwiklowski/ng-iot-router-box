import { IotDeviceManager } from "./iot-device-manager";
import ZigbeeDeviceManager from "./zigbeeDeviceManager";

const DOOR_SENSOR = "0x00158d0002c98376";

const BUTTON_2 = "0x00158d0002048a20";

(async () => {
  const deviceManager = new ZigbeeDeviceManager("/dev/ttyACM0");

  const iotDeviceManager = new IotDeviceManager();
  iotDeviceManager.start();

  try {
    await deviceManager.start();

    deviceManager.onDeviceUpdate = (addr, value) => {
      iotDeviceManager.handleDeviceUpdate(addr, value);
    };
  } catch (err) {
    console.log(err);
  }
})();

import { IotDeviceManager } from "./iot-device-manager";
import ZigbeeDeviceManager from "./zigbeeDeviceManager";

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

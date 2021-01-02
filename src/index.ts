import { IotDeviceManager } from "./iot-device-manager";
import ZigbeeDeviceManager from "./zigbeeDeviceManager";

(async () => {
  const deviceManager = new ZigbeeDeviceManager("/dev/ttyACM0");

  const iotDeviceManager = new IotDeviceManager();
  iotDeviceManager.start();

  try {
    await deviceManager.start();

    deviceManager.onDeviceUpdate = (addr, cluster, value) => {
      iotDeviceManager.handleDeviceUpdate(addr, cluster, value);
    };
  } catch (err) {
    console.log(err);
  }
})();

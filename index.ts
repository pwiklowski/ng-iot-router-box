import ZigbeeDeviceManager from "./zigbeeDeviceManager";

const DOOR_SENSOR = "0x00158d0002c98376";

const BUTTON_1 = "0x00158d0001e80e6f";
const BUTTON_2 = "0x00158d0002048a20";

(async () => {
  const deviceManager = new ZigbeeDeviceManager("/dev/ttyACM0");

  try {
    await deviceManager.start();

    deviceManager.onDeviceUpdate = (addr, value) => {
      console.log("onDeviceUpdate", addr, value);
    };
  } catch (err) {
    console.log(err);
  }
})();

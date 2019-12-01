import Player from "./player";
import ZigbeeDeviceManager from "./zigbeeDeviceManager";

const deviceManager = new ZigbeeDeviceManager("/dev/ttyACM0");
deviceManager.start();

const HO_HO_HO = "music/ho.mp3";
// const WHAM = "music/wham.m4a";
// const CIARA = "music/ciara.mp3";

let player = new Player();

deviceManager.onDeviceUpdate = (addr, variable, value) => {
  console.log("onDeviceUpdate", addr, variable, value);
  if (addr === "0x00158d0002c98376" && variable === "closed") {
    if (value === 1) {
      player.play(HO_HO_HO);
    }
  }
};

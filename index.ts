import Player from "./player";
import ZigbeeDeviceManager from "./zigbeeDeviceManager";
import * as fs from "fs";

const DOOR_SENSOR = "0x00158d0002c98376";

const BUTTON_1 = "0x00158d0001e80e6f";
const BUTTON_2 = "0x00158d0002048a20";

const HO_HO_HO = "music/ho.mp3";

let songs = fs.readdirSync("songs");

const getRandomSong = () => {
  const randomIndex = Math.floor(Math.random() * songs.length);
  console.log(randomIndex, songs[randomIndex]);
  return "songs/" + songs[randomIndex];
};

(async () => {
  const deviceManager = new ZigbeeDeviceManager("/dev/ttyACM0");

  try {
    await deviceManager.start();
    let player = new Player();

    deviceManager.onDeviceUpdate = (addr, value) => {
      console.log("onDeviceUpdate", addr, value);
      if (addr === DOOR_SENSOR) {
        if (value.onOff === 1) {
          player.play(HO_HO_HO);
        }
      } else if (addr === BUTTON_1) {
        if (value.onOff === 1) {
          if (player.isPlaying()) {
            player.stop();
          } else {
            player.play(getRandomSong());
          }
        }
      }
    };
  } catch (err) {
    console.log(err);
  }
})();

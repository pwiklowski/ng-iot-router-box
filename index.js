const Player = require("./player.js");
const HO_HO_HO = "music/ho.mp3";
const WHAM = "music/wham.m4a";
const CIARA = "music/ciara.mp3";

let player = new Player();

player.play("music/ciara.mp3");

setTimeout(() => {
  player.stop();
}, 3000);

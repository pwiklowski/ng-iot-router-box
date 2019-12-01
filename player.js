const { spawn } = require("child_process");

class Player {
  constructor() {
    this.player_process = null;
  }

  play(file) {
    if (this.player_process) {
      this.player_process.kill();
    }
    this.player_process = spawn("mplayer", [file]);
  }

  stop() {
    if (this.player_process) {
      this.player_process.kill();
    }
    this.player_process = null;
  }
}

module.exports = Player;

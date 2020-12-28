import { Controller } from "zigbee-herdsman";

export default class ZigbeeDeviceManager {
  herdsman: any;
  onDeviceUpdate: Function;

  constructor(port: string) {
    const config: any = {
      databasePath: "dev.db",
      serialPort: {
        baudRate: 115200,
        rtscts: true,
        path: port,
      },
    };

    this.herdsman = new Controller(config);
    this.herdsman.on("deviceJoined", (data) => console.log("event", "deviceJoined", data));
    this.herdsman.on("message", this.onMessage.bind(this));
  }

  async onReady() {
    console.log("Pairing");
    await this.herdsman.permitJoin(60, function (err) {
      if (err) console.log(err);
    });
    console.log("Server is ready.");
  }

  onMessage(msg) {
    if (msg.type === "attributeReport") {
      this.onDeviceUpdate(msg.endpoint.deviceIeeeAddress, msg.endpoint.clusters);
    }
  }

  async start() {
    await this.herdsman.start();
    console.log("started");
    await this.onReady();
  }
}

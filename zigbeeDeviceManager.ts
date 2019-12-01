import ZShepherd from "zigbee-herdsman";

export default class ZigbeeDeviceManager {
  shepherd: any;
  onDeviceUpdate: Function;
  constructor(port: string) {
    this.shepherd = new ZShepherd(port, {
      dbPath: "dev.db",
      sp: {
        baudRate: 115200,
        rtscts: true
      }
    });

    this.shepherd.on("ready", this.onReady.bind(this));
    this.shepherd.on("ind", this.onInd.bind(this));
    this.shepherd.acceptDevIncoming = (devInfo, callback) => {
      console.log("new device:", devInfo);
      callback(null, true); //TODO: accept only my devices
    };
  }

  onReady() {
    this.shepherd.permitJoin(60, function(err) {
      if (err) console.log(err);
    });
    console.log("me", this.shepherd.info());
    console.log("list", this.shepherd.list());
    console.log("Server is ready.");
  }

  onInd(msg) {
    if (msg.type === "devChange") {
      const data = msg.data;
      const addr = msg.endpoints[0].device.ieeeAddr;

      if (data.cid === "genOnOff") {
        if (this.onDeviceUpdate) {
          this.onDeviceUpdate(addr, "closed", data.data.onOff);
        }
      } else if (data.cid === "genBasic") {
        if (this.onDeviceUpdate) {
          this.onDeviceUpdate(addr, "battery", data.data["65281"][4]);
        }
      } else {
        console.log(
          "other",
          data.cid,
          data.data["65281"][4],
          JSON.stringify(data)
        );
      }
    }
  }

  start() {
    this.shepherd.start(function(err) {
      if (err) console.log(err);
    });
  }
}

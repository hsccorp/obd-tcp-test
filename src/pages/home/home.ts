import { Component, NgZone } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';


var wifiOBDReader;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  host: string; // ip:port
  wifiOBDReader: any;
  speed: string = "";
  temp: string = "";

  constructor(public navCtrl: NavController, public plt: Platform, public zone: NgZone) {

    var OBDReader = require('obd-bluetooth-tcp');
    wifiOBDReader = new OBDReader();
    var instance = this;

    // set up handlers one time
    wifiOBDReader.on('debug', function (data) { console.log("=>APP DEBUG:" + data) });
    wifiOBDReader.on('error', function (data) {
      console.log("=>APP ERROR:" + data)
    });
    wifiOBDReader.on('dataReceived', function (data) {
      console.log("=>APP: Received Data=" + JSON.stringify(data));

      if (data.name && data.name == 'vss') {
        setTimeout(() => { instance.speed = data.value + " km/hr"; }, 0);
      }
      if (data.name && data.name == 'temp') {
        setTimeout(() => { instance.temp = data.value + " degrees"; }, 0);
      }
    })

    wifiOBDReader.on('connected', function () {
      console.log("=>APP: Connected");
      this.stopPolling();
      this.removeAllPollers();
      this.addPoller("temp");
      this.addPoller("vss");
      console.log("=======>ON START WE HAVE " + this.getNumPollers() + " pollers");
      this.startPolling(2000); //Request  values every 2 second.


    }); // conneceted


  } // constructor

  start() {
    console.log(this.host);
    this.plt.ready().then(() => {
      console.log("Platform ready, instantiating OBD");
      wifiOBDReader.setProtocol(0);
      wifiOBDReader.autoconnect("TCP", this.host);

    }); // ready
  }

  stop() {
    this.plt.ready().then(() => {
      wifiOBDReader.removeAllPollers();
      wifiOBDReader.disconnect();
      wifiOBDReader.stopPolling();
      console.log("=======>ON STOP WE HAVE " + wifiOBDReader.getNumPollers() + " pollers");


    });
  }

} // class




import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';

var wifiOBDReader;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {
  constructor(public navCtrl: NavController, public plt: Platform) {
           plt.ready().then(() => {
          console.log ("Platform ready, instantiating OBD");
        
            var OBDReader = require ('obd-bluetooth-tcp');
            wifiOBDReader = new OBDReader();

            wifiOBDReader.on ('debug' , function (data) {console.log ("=>APP DEBUG:"+ data)});
            wifiOBDReader.on ('error' , function (data) {console.log ("=>APP ERROR:"+ data)});
            wifiOBDReader.setProtocol(0);

            wifiOBDReader.autoconnect("TCP","192.168.1.103:5000");

            wifiOBDReader.on ('connected', function () {
            console.log ("=>APP: Connected");
            this.addPoller("temp");
            this.addPoller("vss");
            this.startPolling(2000); //Request  values every 2 second.

            wifiOBDReader.on ('dataReceived', function (data) {
              console.log ("=>APP: Received Data="+JSON.stringify(data));
            })


          }); // conneceted

        }); // ready
       } // constructor

  } // class




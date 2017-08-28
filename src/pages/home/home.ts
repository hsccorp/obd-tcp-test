import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ChartReadyEvent } from 'ng2-google-charts';


//declare var RadialGauge;

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
  
  @ViewChild('speed') speedChart;
  @ViewChild('temp') tempChart;

   gaugeChartData:any =  {
    chartType: 'Gauge',
    dataTable: [
      ['Label', 'Value'],
      ['Speed', 0],


    ],
    options: {
      animation: {easing: 'out'},
      //width: 50%, height: 50%,
      greenFrom: 1, greenTo: 60,
      yellowFrom: 60, yellowTo: 110,
      redFrom: 110, redTo:220,
      minorTicks: 10,
      min: 0, max: 220,
      greenColor: '#019875',
      yellowColor: '#F9BF3B',
      redColor: '#EF4836',
    }
  };

  tempChartData:any =  {
    chartType: 'Gauge',
    dataTable: [
      ['Label', 'Value'],
      ['Temp.', 0],


    ],
    options: {
      animation: {easing: 'out'},
      //width: 50%, height: 50%,
      greenFrom: 1, greenTo: 60,
      yellowFrom: 60, yellowTo: 110,
      redFrom: 110, redTo:420,
      minorTicks: 10,
      min: -40, max: 420,
      greenColor: '#019875',
      yellowColor: '#F9BF3B',
      redColor: '#EF4836',
    }
  };
  
  
  change() {
    this.changeSpeed();
    this.changeTemp();
  }

  changeSpeed() {
    let min = 0;
    let max = 220;
    let val = Math.floor(Math.random() * (max - min)) + min;
    let data = this.speedChart.wrapper.getDataTable();
    data.setValue(0,1,val);
    this.speedChart.redraw();
  }

  changeTemp() {
    let min = -40;
    let max = 420;
    let val = Math.floor(Math.random() * (max - min)) + min;
    let data = this.tempChart.wrapper.getDataTable();
    data.setValue(0,1,val);
    console.log (JSON.stringify(data));
    this.tempChart.redraw();
  }

  ready(event: ChartReadyEvent) {
    
  }

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
        let mph  = Math.round(data.value * 0.621371); // convert to mph
        setTimeout(() => { 
          instance.speed = mph+ " m/hr";  
          let data = instance.speedChart.wrapper.getDataTable();
          data.setValue(0,1,mph);
          instance.speedChart.redraw(); }, 0);
      }
      if (data.name && data.name == 'temp') {
        let f = Math.round(data.value * 1.8 + 32); // convert to farenheit
        setTimeout(() => { 
          instance.temp = f + " degrees F"; 
          let data = instance.tempChart.wrapper.getDataTable();
          data.setValue(0,1,f);
          instance.tempChart.redraw(); }, 0);
      
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




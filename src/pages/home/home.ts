import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {Graphs} from './graphDefs';
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
  @ViewChild('rpm') rpmChart;
  @ViewChild('load') loadChart;
  @ViewChild('map') mapChart;
  @ViewChild('fuel') fuelChart;

  speedChartData:any;
  tempChartData:any;
  rpmChartData:any;
  loadChartData:any;
  mapChartData:any;
  fuelChartData:any;

  graphs:any;

  change() {
    this.changeChart(this.speedChart, this.graphs.speedChartData.options.min,this.graphs.speedChartData.options.max);
    this.changeChart(this.tempChart,this.graphs.tempChartData.options.min,this.graphs.tempChartData.options.max);
    this.changeChart(this.rpmChart,this.graphs.rpmChartData.options.min,this.graphs.rpmChartData.options.max);
    this.changeChart(this.loadChart,this.graphs.loadChartData.options.min,this.graphs.loadChartData.options.max);
    this.changeChart(this.mapChart,this.graphs.mapChartData.options.min,this.graphs.mapChartData.options.max,);
    this.changeChart(this.fuelChart,this.graphs.fuelChartData.options.min,this.graphs.fuelChartData.options.max);
   
  }
  changeChart (chart, min, max) {
    let val = Math.floor(Math.random() * (max - min)) + min;
    let data = chart.wrapper.getDataTable();
    data.setValue(0,1,val);
    chart.redraw();
  }
  constructor(public navCtrl: NavController, public plt: Platform,) {

    this.graphs = new Graphs();
    var OBDReader = require('obd-bluetooth-tcp');
    wifiOBDReader = new OBDReader();
    var instance = this;

    //console.log (JSON.stringify(wifiOBDReader.getPIDObjectByName('vss')));
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
      if (data.name && data.name == 'rpm') {
        setTimeout(() => { 
          let cdata = instance.rpmChart.wrapper.getDataTable();
          cdata.setValue(0,1,parseInt(data.value));
          instance.rpmChart.redraw(); }, 0);
      }
      if (data.name && data.name == 'load_pct') {
        setTimeout(() => { 
          let cdata = instance.loadChart.wrapper.getDataTable();
          cdata.setValue(0,1,parseInt(data.value));
          instance.loadChart.redraw(); }, 0);
      }
      if (data.name && data.name == 'map') {
        setTimeout(() => { 
          let cdata = instance.mapChart.wrapper.getDataTable();
          cdata.setValue(0,1,parseInt(data.value));
          instance.mapChart.redraw(); }, 0);
      }
      if (data.name && data.name == 'frp') {
        setTimeout(() => { 
          let cdata = instance.fuelChart.wrapper.getDataTable();
          cdata.setValue(0,1,parseInt(data.value));
          instance.fuelChart.redraw(); }, 0);
      }
    })
    wifiOBDReader.on('connected', function () {
      console.log("=>APP: Connected");
      this.stopPolling();
      this.removeAllPollers();
      this.addPoller("vss"); // 0,220 mph
      this.addPoller("temp"); // -40,215 C
      this.addPoller("rpm"); // 0, 5178
      this.addPoller("load_pct"); // 0,100%
      this.addPoller("map");// 0,255 kPa
      this.addPoller("frp"); // fuel pressure , 0,765 kPa
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




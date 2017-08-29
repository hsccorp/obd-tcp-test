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
  @ViewChild('rpm') rpmChart;
  @ViewChild('load') loadChart;
  @ViewChild('map') mapChart;
  @ViewChild('fuel') fuelChart;


   speedChartData:any =  {
    chartType: 'Gauge',
    dataTable: [
      ['Label', 'Value'],
      ['Speed', 0],
    ],
    options: {
      animation: {easing: 'out'},
      greenFrom: 1, greenTo: 60,
      yellowFrom: 60, yellowTo: 110,
      redFrom: 110, redTo:220,
      minorTicks: 10,
      min: 0, max: 160,
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

  rpmChartData:any =  {
    chartType: 'Gauge',
    dataTable: [
      ['Label', 'Value'],
      ['RPM', 0],
    ],
    options: {
      animation: {easing: 'out'},
      greenFrom: 0, greenTo: 2000,
      yellowFrom: 2000, yellowTo: 4000,
      redFrom: 4000, redTo:5178,
      min: -0, max: 5178,
      greenColor: '#019875',
      yellowColor: '#F9BF3B',
      redColor: '#EF4836',
    }
  };

  loadChartData:any =  {
    chartType: 'Gauge',
    dataTable: [
      ['Label', 'Value'],
      ['Load %', 0],
    ],
    options: {
      animation: {easing: 'out'},
      greenFrom: 0, greenTo: 50,
      yellowFrom: 50, yellowTo: 75,
      redFrom: 75, redTo:100,
      min: 0, max: 100,
      greenColor: '#019875',
      yellowColor: '#F9BF3B',
      redColor: '#EF4836',
    }
  };


  mapChartData:any =  {
    chartType: 'Gauge',
    dataTable: [
      ['Label', 'Value'],
      ['Intake kPa.', 0],
    ],
    options: {
      animation: {easing: 'out'},
      greenFrom: 0, greenTo: 50,
      yellowFrom: 50, yellowTo: 150,
      redFrom: 150, redTo:255,
      min: 0, max: 255,
      greenColor: '#019875',
      yellowColor: '#F9BF3B',
      redColor: '#EF4836',
    }
  };


  fuelChartData:any =  {
    chartType: 'Gauge',
    dataTable: [
      ['Label', 'Value'],
      ['Fuel kPa.', 0],
    ],
    options: {
      animation: {easing: 'out'},
      greenFrom: 0, greenTo: 150,
      yellowFrom: 150, yellowTo: 500,
      redFrom: 500, redTo:765,
      min: 0, max: 765,
      greenColor: '#019875',
      yellowColor: '#F9BF3B',
      redColor: '#EF4836',
    }
  };



  
  
  change() {
    this.changeChart(this.speedChart,0,220);
    this.changeChart(this.tempChart,-40,420);
    this.changeChart(this.rpmChart,0,5178);
    this.changeChart(this.loadChart,0,100);
    this.changeChart(this.mapChart,0,255);
    this.changeChart(this.fuelChart,0,765);
   
  }

  changeChart (chart, min, max) {
    let val = Math.floor(Math.random() * (max - min)) + min;
    let data = chart.wrapper.getDataTable();
    data.setValue(0,1,val);
    chart.redraw();
  }


  ready(event: ChartReadyEvent) {
    
  }

  constructor(public navCtrl: NavController, public plt: Platform, public zone: NgZone) {

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
          let data = instance.rpmChart.wrapper.getDataTable();
          data.setValue(0,1,parseInt(data.value));
          instance.rpmChart.redraw(); }, 0);
      }

      if (data.name && data.name == 'load_pct') {
        setTimeout(() => { 
          let data = instance.loadChart.wrapper.getDataTable();
          data.setValue(0,1,parseInt(data.value));
          instance.loadChart.redraw(); }, 0);
      }

      if (data.name && data.name == 'map') {
        setTimeout(() => { 
          let data = instance.mapChart.wrapper.getDataTable();
          data.setValue(0,1,parseInt(data.value));
          instance.mapChart.redraw(); }, 0);
      }

      if (data.name && data.name == 'frp') {
        setTimeout(() => { 
          let data = instance.fuelChart.wrapper.getDataTable();
          data.setValue(0,1,parseInt(data.value));
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




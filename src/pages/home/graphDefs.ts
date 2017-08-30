
// common gauge defs

export var speedChartData:any =  {
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

  export var tempChartData:any =  {
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

  export var rpmChartData:any =  {
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

  export var loadChartData:any =  {
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


  export var mapChartData:any =  {
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


  export var fuelChartData:any =  {
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


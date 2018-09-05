import { Component, OnInit, Input } from '@angular/core';
import { ChartData, chartDataItem } from '../Core/interface';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  ngOnInit(): void {
   
  }

 
  private  _chartName: string;

  ibHeading: string = "Inbound";
  obHeading: string = "Outbound";
  private _chartData: Array<chartDataItem>;
  get chartName() {
    return this._chartName;
  }

  @Input()
  set chartName(name: string) {
   // alert(name+' in chart name');
    this._chartName = name;

  }
  get chartData() {
    return this._chartData;
  }
  @Input()
  set chartData(chart: Array<chartDataItem>) {

    console.log("chart data called :-> "+chart.length);
    chart.forEach(data => { console.log("chart data:-> "+data.type + '  ' + data.open + '   ' + data.closed); });
    this.barChartLabels = [];
   
    this._chartData = chart;
    this._chartData.forEach(data => {
      this.barChartLabels.push(data.type);
     
    });

   

   // this.barChartData = [];
    this.barChartLabels.forEach(data => console.log(data));
    
    this.barChartData = [{ data: [this.chartData[0].open,this.chartData[1].open], label: 'open' },
     { data: [this.chartData[0].closed,this.chartData[1].closed], label: 'closed' }, { data: [this.chartData[0].cancelled,,this.chartData[1].cancelled], label: 'cancelled' }]
  }
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2006', '2007',];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [], label: 'open' },
    { data: [], label: 'closed' },
    { data: [], label: 'cancelled' }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public chartColors: any[] = [
    {
      backgroundColor: ["#FF913E","#FF913E"]
    }, {
      backgroundColor: ["rgb(66, 133, 244)","rgb(66, 133, 244)"]
    }, {
      backgroundColor: ["grey","grey"]
    }
  ];
  // public randomize(): void {
  //   // Only Change 3 values
  //   let data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     (Math.random() * 100),
  //     56,
  //     (Math.random() * 100),
  //     40];
  //   let clone = JSON.parse(JSON.stringify(this.barChartData));
  //   clone[0].data = data;
  //   this.barChartData = clone;
  //   /**
  //    * (My guess), for Angular to recognize the change in the dataset
  //    * it has to change the dataset variable directly,
  //    * so one way around it, is to clone the data, change it and then
  //    * assign it;
  //    */
  // }
}

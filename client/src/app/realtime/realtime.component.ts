import { Component, OnInit, OnChanges, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RealTimeDataService } from '../../services/realtimedata.service';

@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.scss']
})
export class RealtimeComponent implements OnInit{

  public user: object;
  public lineChartData: Array<any> = [
    {data: [], label: 'C'},
    {data: [], label: '%'},
  ];
  public lineChartLabels: Array<any> = [];
  public printData: Array<number>;
  public lineChartColors: Array<any> = 
  this.lineChartColors = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,0)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,0)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public interval: any;


  constructor(
    public auth: AuthService,
    public realTimeService: RealTimeDataService,
    private route: ActivatedRoute) {

    this.user = this.auth.getUser();
    this.auth.getLoginEventEmitter()
      .subscribe(user => this.user = user);
  }

  ngOnInit() {
    this.interval = setInterval(() => { this.realTimeChart() }, 1000);
    
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  public realTimeChart() {

    this.realTimeService.getDataT()
      .map(data => {
        let temperature = data.map(t => Number(t.temperature));
        let humidity = data.map(t => Number(t.humidity));
        let date = data.map(t => t.created_at);
        return {
          temperature, humidity, date
        };
      })
      .subscribe(data => {
        this.lineChartData =  [
          {data: [...this.lineChartData[0].data, ...data.temperature[0]],  label: 'C'},
          {data: [...this.lineChartData[1].data, ...data.humidity[0]],  label: '%'},
        ];
        this.lineChartLabels = [...this.lineChartLabels, ...data.date[0]];
        console.log(this.lineChartData);
      })
  }



  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
    // { data: data[0], label: 'ºC' },
    // { data: data[1], label: '%' } ];
    // console.log("LINECHARTDAATA");
    // console.log(this.lineChartData)

    // this.lineChartType = 'line';
    // this.lineChartLabels = data[2];
    // console.log("dates!!!" + this.lineChartLabels)
    // this.lineChartLegend = true;

  }

}

import { Component, OnInit, OnChanges, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RealTimeDataService } from '../../services/realtimedata.service';

function zeroArray(n, value:any = 0){
  let a = [];
  for(var i = 0; i<n;i++){
    a.push(value);
  }
  return a;
}

@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.scss']
})
export class RealtimeComponent implements OnInit{

  public user: object;
  public lineChartData: Array<any> = [
    {data: zeroArray(20), label: 'C'},
    {data: zeroArray(20), label: '%'},
  ];


  public lineChartLabels: Array<any> = zeroArray(20,"");
  public lineChartColors: Array<any> = [
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
        let date = data.map(t => t.fecha);
        return {
          temperature, humidity, date
        };
      })
      .subscribe(data => {
        const temp = this.lineChartData[0].data
        temp.shift();
        temp.push(data.temperature[data.temperature.length-1]);
        const humi = this.lineChartData[1].data
        humi.shift();
        humi.push(data.humidity[data.humidity.length-1])
        const time = this.lineChartLabels.slice();
        time.shift()
        time.push(data.date[data.date.length-1])

        this.lineChartData =  [
          {data: [...temp],  label: 'C'},
          {data: [...humi],  label: '%'},
        ];
       this.lineChartLabels = time;
       console.log(this.lineChartData[0].data);
       console.log(this.lineChartLabels);
      })
  }


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);

  }

}

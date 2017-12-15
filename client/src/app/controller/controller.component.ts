import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RealTimeDataService } from '../../services/realtimedata.service';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {

  public user: object;
  public realT: any;

  constructor(
    public auth: AuthService,
    public realTimeService: RealTimeDataService,
    private route: ActivatedRoute) {

    this.user = this.auth.getUser();
    this.auth.getLoginEventEmitter()
      .subscribe(user => this.user = user);
  }

  ngOnInit() {
    this.realT = setInterval(() => { this.realTimeInfo() }, 3000);

  }

  ngOnDestroy() {
    clearInterval(this.realT);
  }

  public realTimeInfo(){

    this.realTimeService.getDataT()
      .map(data =>{
        let temperature = data.map(t => Number(t.temperature));
        console.log(temperature)
        return temperature
      })

  }

}

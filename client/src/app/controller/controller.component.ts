import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RealTimeDataService } from '../../services/realtimedata.service';
import { ConfigAcService } from '../../services/config-ac.service';
import { NgForm } from '@angular/forms';
import { ConfigAC } from '../interfaces/ConfigAC.interface';


@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {

  public user: object;
  public data: any;
  public interval: any;
  public acOrder: ConfigAC;
  public room =[
    {value: "1", display: "Main Room" }
  ];
  public states =[
    { value: "ON", display: "ON" },
    { value: "OFF", display: "OFF" }
  ];
  public swings = [
    { value: "ON", display: "ON" },
    { value: "OFF", display:"OFF" }
  ]

  constructor(
    public auth: AuthService,
    public order: ConfigAcService,
    public realTimeService: RealTimeDataService,
    private route: ActivatedRoute) {

    this.user = this.auth.getUser();
    this.auth.getLoginEventEmitter()
      .subscribe(user => this.user = user);
  }

  ngOnInit() {
    this.interval = setInterval(() => { this.realTimeInfo() }, 3000);
    this.acOrder = {
      room: "1",
      state: this.states[0].value,
      setTemp: "25",
      mode: "3",
      fanSpeed: "3",
      swing: this.swings[0].value
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  public realTimeInfo() {

    this.realTimeService.getDataT()
      .map(data => {
        let temperature = data.map(t => Number(t.temperature));
        return temperature
      })
      .subscribe(data => { this.data = data })
  }

  public powerAC() {
    const { room, state, setTemp, mode, fanSpeed, swing } = this.acOrder;
    this.order.sendOrderAC(room, state, setTemp, mode, fanSpeed, swing)
      .subscribe(order => order)
  }

}

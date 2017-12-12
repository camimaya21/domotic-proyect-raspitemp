import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RealTimeDataService } from '../../services/realtimedata.service';

@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.scss']
})
export class RealtimeComponent implements OnInit {
  user:object;
  data:object;
  constructor(
    public auth:AuthService,
    public realTime:RealTimeDataService,
    private route: ActivatedRoute) {

    this.user = this.auth.getUser();
    this.auth.getLoginEventEmitter()
        .subscribe(user => this.user = user);
   }

  ngOnInit() {

  }

}

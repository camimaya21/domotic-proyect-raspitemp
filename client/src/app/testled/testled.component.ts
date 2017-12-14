import { Component, OnInit } from '@angular/core';
import { ConfigAcService } from '../../services/config-ac.service';
import { AuthService } from '../../services/auth.service';
import { Router , ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-testled',
  templateUrl: './testled.component.html',
  styleUrls: ['./testled.component.scss']
})
export class TestledComponent {
  orderInfo = {
    ledtest:"",
  }
    
  constructor(public order:ConfigAcService) { }

  sendOrder(){
    const{ledtest} = this.orderInfo;
    this.order.sendOrderLed(ledtest)
    .subscribe( order => order )
  }
}

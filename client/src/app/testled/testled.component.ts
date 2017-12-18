import { Component, OnInit } from '@angular/core';
import { ConfigAcService } from '../../services/config-ac.service';
import { AuthService } from '../../services/auth.service';
import { Router , ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs/Observable';

interface orderInfo {
  ledtest: string
}

@Component({
  selector: 'app-testled',
  templateUrl: './testled.component.html',
  styleUrls: ['./testled.component.scss']
})
export class TestledComponent implements OnInit {
  public orderInfo
  public ledtests = [
    { value: "H", display: "ON" },
    { value: "L", display:"OFF" }
  ]

  constructor(public order:ConfigAcService) { }

ngOnInit(){
  this.orderInfo = {
    ledtest: this.ledtests[0].value
  }
}

  sendOrder(){
    const{ledtest} = this.orderInfo;
    this.order.sendOrderLed(ledtest)
    .subscribe( order => order )
  }
}

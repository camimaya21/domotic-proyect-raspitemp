import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProyectorService } from '../../services/proyector.service';
import { Router , ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-proyector',
  templateUrl: './proyector.component.html',
  styleUrls: ['./proyector.component.scss']
})
export class ProyectorComponent {

    proyector = {
      state:"",
    }

  constructor(public pro:ProyectorService, public auth:AuthService, public router: Router, public route: ActivatedRoute) { }



  onProyector(){
    const{state} = this.proyector;
    this.pro.sendOrderProyector(state)
    .subscribe( proyector => proyector )
  }

}

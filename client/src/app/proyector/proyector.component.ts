import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProyectorService } from '../../services/proyector.service';
import { Router , ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs/Observable';

interface proyector {
  state: string
}

@Component({
  selector: 'app-proyector',
  templateUrl: './proyector.component.html',
  styleUrls: ['./proyector.component.scss']
})
export class ProyectorComponent implements OnInit{

   public proyector 
   public states =[
    { value: "ON", display: "ON" },
    { value: "OFF", display:"OFF" }
   ]

  constructor(public pro:ProyectorService, public auth:AuthService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit(){
    this.proyector = {
      state: this.states[0].value
    }
  }


  onProyector(){
    const{state} = this.proyector;
    this.pro.sendOrderProyector(state)
    .subscribe( proyector => proyector )
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router , ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.scss']
})

export class SignupformComponent {
  formInfo = {
    username:"",
    name:"",
    email:"",
    city:"",
    password:""
  }

  constructor(public auth:AuthService, public router: Router, public route: ActivatedRoute) { }

  signup(){
    const{username, name, email, city, password} = this.formInfo;
    if (username != "" && password != ""){
      this.auth.signup(username, name, email, city, password)
      .map(user => user)
      .subscribe()
      this.router.navigate(['controller'])
    } else {
      console.log("You need to set the information above to continue")
    }
  }
}

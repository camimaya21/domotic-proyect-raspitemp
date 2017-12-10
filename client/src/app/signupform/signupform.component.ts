import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

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

  constructor(public auth:AuthService) { }

  signup(){
    const{username, name, email, city, password} = this.formInfo;
    if (username != "" && password != ""){
      this.auth.signup(username, name, email, city, password)
      .map(user => console.log(user))
      .subscribe();
    } else {
      console.log("You need to set the information above to continue")
    }
  }
}

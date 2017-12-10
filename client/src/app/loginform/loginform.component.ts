import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

interface LoginForm{
  username:string;
  password:string;
}

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss']
})
export class LoginformComponent {
  formInfo:LoginForm = {
    username: "",
    password: ""
  }

  constructor(public auth:AuthService) { }

  login(){
    const {username, password} = this.formInfo;
    if (username != "" && password != ""){
      console.log(`Login with ${username} ${password}`)
      this.auth.login(username, password)
      .map(user => console.log(user))
      .subscribe();
    } else {
      console.log("You need to provide a username and a password")
    }
  }
}

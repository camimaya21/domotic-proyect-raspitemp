import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router , ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs/Observable';

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

  constructor(public auth:AuthService, public router: Router, public route: ActivatedRoute) { }

  login(){
    const {username, password} = this.formInfo;
    if (username != "" && password != ""){
      this.auth.login(username, password)
      .map(user => console.log(user))
      .subscribe((user)=> {
        this.router.navigate([''])
      })
    } else {
      console.log("You need to provide a username and a password")
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  constructor( private auth:AuthService) { }

  login(username, password){
    this.auth.login(username, password).subscribe();
  }

  signup(username, name, email, city, password, lat, lon){
    this.auth.signup(username, name, email, city, password, lat, lon).subscribe();
  }

  logout(){
    this.auth.logout().subscribe();
  }

}

import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router , ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user:object;
  constructor(public auth:AuthService) {
    this.user = this.auth.getUser();
    this.auth.getLoginEventEmitter()
        .subscribe(user => this.user = user);
  }

  ngOnInit() {
  }


  logout() {
      this.auth.logout().subscribe();
    }
}

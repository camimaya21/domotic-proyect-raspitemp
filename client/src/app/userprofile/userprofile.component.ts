import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router , ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent {
  user:object;
  constructor(public auth:AuthService) {
    this.user = this.auth.getUser();
    this.auth.getLoginEventEmitter()
        .subscribe(user => this.user = user);
  }
}
